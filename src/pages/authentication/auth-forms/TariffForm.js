import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import {
  useDeleteTariffMutation,
  useFetchCitiesQuery,
  useUpdateTariffMutation,
} from 'store/reducers/api';
import { setBalanceOpen } from 'store/reducers/action';

const TariffForm = ({ profile }) => {
  const [open, setOpen] = React.useState(false);
  const { data: cities = [] } = useFetchCitiesQuery();
  const [updateTariff] = useUpdateTariffMutation();
  const [deleteTariff] = useDeleteTariffMutation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  console.log(cities, profile.city);

  return (
    <>
      <Formik
        initialValues={{
          tariff: profile.tariff?.id || '',
        }}
        validationSchema={Yup.object().shape({
          tariff: Yup.string(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log('Selected Tariff:', values.tariff);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, setErrors, errors, setSubmitting, setStatus, isSubmitting }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack direction="column" spacing={1} alignItems="center">
                  <Typography variant="h4">
                    Выбранный тариф будет активен <b>в течение 1 часа</b> после активации.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                {errors.submit && (
                  <FormHelperText error id="helper-text-submit-tariff">
                    {errors.submit}
                  </FormHelperText>
                )}
              </Grid>
              {cities
                .find((city) => city.id === profile?.city?.id)
                ?.tariffs?.map((tariff) => {
                  const isSelected = values.tariff === tariff.id;

                  return (
                    <Grid item xs={12} sm={6} key={tariff.id}>
                      <Card
                        sx={{
                          border: isSelected ? '1px solid' : '1px solid',
                          borderColor: isSelected ? 'primary.main' : 'rgba(224, 224, 224, 0.67)',
                          boxShadow: isSelected ? theme.customShadows.z1 : 'none',
                          transition: '0.3s',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'primary.lighter' : 'transparent',
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" alignItems="space-between" spacing={1}>
                            <Typography variant="h4" gutterBottom>
                              {tariff.name}
                            </Typography>
                            {isSelected && (
                              <Typography variant="h6" color="primary">
                                Активный
                              </Typography>
                            )}
                          </Stack>
                          <Typography variant="h5" color="textSecondary">
                            {tariff.price} ₸ / час
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            whiteSpace="pre-line"
                          >
                            {tariff.description}
                          </Typography>
                          <Button
                            variant={isSelected ? 'contained' : 'outlined'}
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={async () => {
                              setSubmitting(true);
                              let response;

                              if (isSelected) {
                                response = await deleteTariff();
                                if (response?.error) {
                                  setErrors({
                                    submit: 'Что-то пошло не так при удалении тарифа',
                                  });
                                  setStatus({ success: false });
                                } else {
                                  setFieldValue('tariff', null);
                                  setStatus({ success: true });
                                }
                              } else {
                                response = await updateTariff({ tariff_id: tariff.id });
                                if (response?.error?.status === 409) {
                                  setOpen(true);
                                  setStatus({ success: false });
                                } else if (response?.error) {
                                  setErrors({
                                    submit: 'Что-то пошло не так при обновлении тарифа',
                                  });
                                  setStatus({ success: false });
                                } else {
                                  setFieldValue('tariff', tariff.id);
                                  setStatus({ success: true });
                                }
                              }
                              setSubmitting(false);
                            }}
                            disabled={isSubmitting}
                          >
                            {isSelected ? 'Деактивировать' : 'Активировать'}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </form>
        )}
      </Formik>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            У вас недостаточно средств на балансе
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              dispatch(setBalanceOpen(true));
            }}
            autoFocus
            color="primary"
          >
            Пополнить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TariffForm;
