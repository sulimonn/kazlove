// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const AnketaForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          type: '',
          gender: '',
          age: '',
          height: '',
          weight: '',
          chest: '',
          nation: '',
          address: '',
          services: '',
          price: '',
          city: '',
          description: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Имя обязательно'),
          email: Yup.string()
            .email('Введите корректный email')
            .max(255)
            .required('Email обязателен'),
          phone: Yup.string().max(255).required('Телефон обязателен'),
          type: Yup.string().max(255).required('Тип обязателен'),
          gender: Yup.string().max(255).required('Пол обязателен'),
          age: Yup.string().max(255).required('Возраст обязателен'),
          height: Yup.string().max(255).required('Рост обязателен'),
          weight: Yup.string().max(255).required('Вес обязателен'),
          chest: Yup.string().max(255).required('Грудь обязателен'),
          nation: Yup.string().max(255).required('Национальность обязателен'),
          address: Yup.string().max(255).required('Адрес обязателен'),
          services: Yup.string().max(255).required('Услуги обязательны'),
          price: Yup.string().max(255).required('Цена обязательна'),
          city: Yup.string().max(255).required('Город обязателен'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Имя*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Телефон*</InputLabel>
                  <OutlinedInput
                    id="phone-login"
                    type="phone"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+7 (999) 999-99-99"
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@re.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="demo-select-small-label">Тип</InputLabel>
                  <Select
                    sx={{
                      '& .MuiList-root': { backgroundColor: 'background.default' },
                    }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={values.type}
                    label="Тип"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Массажистка</MenuItem>
                    <MenuItem value={20}>Проститутка</MenuItem>
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error id="helper-text-type-signup">
                      {errors.type}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="demo-select-small-label">Пол*</InputLabel>
                  <Select
                    sx={{
                      '& .MuiList-root': { backgroundColor: '#121212 !important' },
                    }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={values.gender}
                    label="Пол"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Женский</MenuItem>
                    <MenuItem value={20}>Мужской</MenuItem>
                  </Select>
                  {touched.gender && errors.gender && (
                    <FormHelperText error id="helper-text-gender-signup">
                      {errors.gender}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Рост*</InputLabel>
                  <OutlinedInput
                    id="height-login"
                    type="number"
                    min="0"
                    value={values.height}
                    name="height"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="170"
                    fullWidth
                    error={Boolean(touched.height && errors.height)}
                  />
                  {touched.height && errors.height && (
                    <FormHelperText error id="helper-text-height-signup">
                      {errors.height}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Вес*</InputLabel>
                  <OutlinedInput
                    id="weight-login"
                    type="number"
                    min="0"
                    value={values.weight}
                    name="weight"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="45"
                    fullWidth
                    error={Boolean(touched.weight && errors.weight)}
                  />
                  {touched.weight && errors.weight && (
                    <FormHelperText error id="helper-text-weight-signup">
                      {errors.weight}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Размер груди*</InputLabel>
                  <OutlinedInput
                    id="chest-login"
                    type="number"
                    min="0"
                    value={values.chest}
                    name="chest"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2"
                    fullWidth
                    error={Boolean(touched.chest && errors.chest)}
                  />
                  {touched.chest && errors.chest && (
                    <FormHelperText error id="helper-text-chest-signup">
                      {errors.chest}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Возраст*</InputLabel>
                  <OutlinedInput
                    id="age-login"
                    type="number"
                    min="0"
                    value={values.age}
                    name="age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2"
                    fullWidth
                    error={Boolean(touched.age && errors.age)}
                  />
                  {touched.age && errors.age && (
                    <FormHelperText error id="helper-text-age-signup">
                      {errors.age}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="nation-form">Национальность*</InputLabel>
                  <OutlinedInput
                    id="nation-form"
                    type="text"
                    value={values.nation}
                    name="nation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Марсианка"
                    fullWidth
                    error={Boolean(touched.nation && errors.nation)}
                  />
                  {touched.nation && errors.nation && (
                    <FormHelperText error id="helper-text-nation-form">
                      {errors.nation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="city-form">Город*</InputLabel>
                  <OutlinedInput
                    id="city-form"
                    type="text"
                    value={values.city}
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Москва"
                    fullWidth
                    error={Boolean(touched.city && errors.city)}
                  />
                  {touched.city && errors.city && (
                    <FormHelperText error id="helper-text-city-form">
                      {errors.city}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="price-form">Цена*</InputLabel>
                  <OutlinedInput
                    id="price-form"
                    type="number"
                    min="0"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="3000+"
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="helper-text-price-form">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address-form">Адрес*</InputLabel>
                  <OutlinedInput
                    id="address-form"
                    type="text"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="г. Москва, ул. Пушкина, д. 23"
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-form">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="services-form">Услуги*</InputLabel>
                  <TextField
                    id="services-form"
                    type="text"
                    value={values.services}
                    name="services"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Массаж, ..."
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.services && errors.services)}
                  />
                  {touched.services && errors.services && (
                    <FormHelperText error id="helper-text-services-form">
                      {errors.services}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="decription-form">Обо мне*</InputLabel>
                  <TextField
                    id="decription-form"
                    type="text"
                    value={values.decription}
                    name="decription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Напишите какой-нибудь текст"
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.decription && errors.decription)}
                  />
                  {touched.decription && errors.decription && (
                    <FormHelperText error id="helper-text-decription-form">
                      {errors.decription}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Создать анкету
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AnketaForm;
