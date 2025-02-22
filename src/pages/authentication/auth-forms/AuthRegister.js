import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from 'contexts/index';
import { setEmail } from 'store/reducers/action';
import { useResendCodeMutation } from 'store/reducers/api';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const dispatch = useDispatch();
  const { register } = useAuth();
  const [sendCode] = useResendCodeMutation();
  const navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          password2: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Введите корректный email')
            .max(255)
            .required('Email обязателен'),
          password: Yup.string()
            .min(8, 'Пароль должен содержать минимум 8 символов')
            .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
            .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
            .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
            .max(255)
            .required('Пароль обязателен'),
          password2: Yup.string()
            .max(255)
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Подтвердите пароль'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await register(values);
            if (response?.status === 400) {
              setErrors({
                email: true,
                submit: 'Пользователь с таким Email уже существует',
              });
              setStatus({ success: false });
            }
            if (!response) {
              const res = await sendCode({ email: values.email });
              if (res?.error) {
                setStatus({ success: false });
                setSubmitting(false);
                return;
              }
              dispatch(setEmail(values));
              navigate('/verify-email', { replace: true });
            }
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Пароль*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} mt={2}>
                  <InputLabel htmlFor="password2-signup">Подтвердите пароль*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password2 && errors.password2)}
                    id="password2-signup"
                    type="password"
                    value={values.password2}
                    name="password2"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password2 && errors.password2 && (
                    <FormHelperText error id="helper-text-password2-signup">
                      {errors.password2}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Регистрируясь, вы соглашаетесь с нашими{' '}
                  <Link variant="subtitle1" component={RouterLink} to="#">
                    Условиями обслуживания
                  </Link>{' '}
                  и{' '}
                  <Link variant="subtitle1" component={RouterLink} to="#">
                    Политикой конфиденциальности
                  </Link>
                  .
                </Typography>
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
                    Создать аккаунт
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

export default AuthRegister;
