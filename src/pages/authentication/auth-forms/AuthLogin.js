import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { setEmail } from 'store/reducers/action';
import { useResendCodeMutation } from 'store/reducers/api';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const { login } = useAuth();
  const [senCode, { isLoading }] = useResendCodeMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Введите корректный email')
            .max(255)
            .required('Email обязателен'),
          password: Yup.string().max(255).required('Пароль обязателен'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await login({
              social_link: values.email,
              password: values.password,
            });

            if (
              response?.status === 400 ||
              response?.originalStatus === 500 ||
              (response?.status === 403 && response?.data?.detail === 'Forbidden')
            ) {
              setErrors({
                email: true,
                password: true,
                submit: 'Неправильная почта или пароль',
              });
              setStatus({ success: false });
            } else if (response?.status === 403) {
              setErrors({
                email: true,
                submit: 'Почта не верифицирована',
                status: 403,
              });
              setStatus({ success: false });
            }

            if (response === null) {
              navigate('/', { replace: true }); // Redirect to the main page
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setErrors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && typeof errors.email === 'string' && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Пароль</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && typeof errors.password === 'string' && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Забыли пароль?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  {errors?.status === 403 ? (
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={async () => {
                        const response = await senCode({ email: values.email });
                        if (response?.error) {
                          setErrors({ submit: 'Ошибка отправки кода' });
                        } else {
                          dispatch(setEmail({ email: values.email }));
                          navigate('/verify-email');
                        }
                      }}
                      disabled={isLoading}
                    >
                      Подтвердить почту
                    </Button>
                  ) : (
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Войти
                    </Button>
                  )}
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
