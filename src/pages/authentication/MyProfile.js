import { useNavigate } from 'react-router-dom';
import React from 'react';

// material-ui
import { Grid, Stack, Typography, Container, Button, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';

// project import
import AnketaForm from './auth-forms/AnketaForm';
import { useAuth } from 'contexts/index';
import { useDeleteProfileMutation, useHideProfileMutation } from 'store/reducers/api';
import TariffForm from './auth-forms/TariffForm';

// ================================|| LOGIN ||================================ //

const MyProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { profile, isFetching } = useAuth();
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();
  const [hideProfile, { isLoading: isHiding }] = useHideProfileMutation();

  if (!profile?.id && !isDeleting && !isHiding && !isFetching) return navigate('/');

  return (
    <>
      <Container sx={{ backgroundColor: 'background.paper', my: 8 }}>
        <TabContext value={value}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="baseline"
                spacing={2}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  <Tab
                    sx={{
                      flex: { xs: 1, sm: 'unset' },
                      maxWidth: { xs: 'unset', sm: 'initial' },
                    }}
                    label={<Typography variant="h4">Анкета</Typography>}
                    value="profile"
                  />
                  {profile?.checked && profile?.approved && profile?.hidden === 0 && (
                    <Tab
                      sx={{
                        flex: 1,
                      }}
                      label={<Typography variant="h4">Тариф</Typography>}
                      value="tariff"
                    />
                  )}
                </TabList>
                {value === 'profile' && (
                  <Stack
                    direction="row"
                    spacing={1}
                    width={{ xs: '100%', sm: 'auto' }}
                    justifyContent={{ xs: 'space-between', sm: 'flex-end' }}
                  >
                    <Button
                      variant={profile?.hidden === 0 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() =>
                        hideProfile({
                          id: profile?.id,
                          data: { hidden: profile?.hidden === 0 ? 1 : 0 },
                        })
                      }
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        width: 'fit-content',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        textTransform: 'none',
                        transition: 'transform 0.3s ease-in-out', // Плавный переход
                        flexDirection: 'row',
                      }}
                      disabled={isHiding}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          textTransform: 'none',
                          transition: 'transform 0.3s ease-in-out', // Плавное изменение позиции
                          transform: profile?.hidden === 1 ? 'translateX(30px)' : 'translateX(0)', // Плавно сдвигаем текст
                        }}
                      >
                        {profile?.hidden === 1 ? 'Показать' : 'Скрыть анкету'}
                      </Typography>
                      <RadioButtonCheckedIcon
                        sx={{
                          transition: 'transform 0.3s ease-in-out', // Плавное изменение позиции
                          transform: profile?.hidden === 1 ? 'translateX(-80px)' : 'translateX(0)', // Плавно сдвигаем иконку
                        }}
                      />
                    </Button>

                    <Button
                      color="error"
                      sx={{ textTransform: 'none', alignSelf: 'flex-end' }}
                      endIcon={<DeleteIcon />}
                      onClick={handleClickOpen}
                      disabled={isDeleting}
                    >
                      {!isDeleting ? (
                        'Удалить анкету'
                      ) : (
                        <>
                          Удаляется <CircularProgress size={15} />
                        </>
                      )}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="profile" sx={{ p: 0 }}>
                <AnketaForm profile={profile} />
              </TabPanel>
              {profile?.checked && profile?.approved && profile?.hidden === 0 && (
                <TabPanel value="tariff">
                  <TariffForm profile={profile} />
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить свою анкету?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Нет
          </Button>
          <Button
            onClick={async () => {
              const result = await deleteProfile(profile?.id || 0);
              if (result?.data) {
                navigate('/login');
                handleClose();
              }
            }}
            autoFocus
            color="error"
          >
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyProfile;
