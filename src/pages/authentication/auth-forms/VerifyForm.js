import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid, Stack, Typography, FormHelperText } from '@mui/material';
import VerificationInput from 'react-verification-input';

// assets
import './pincode.css';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { resetCode } from 'store/reducers/action';
import { useVerifyEmailMutation, useResendCodeMutation } from 'store/reducers/api';
import { useAuth } from 'contexts/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const VerifyEmail = () => {
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();
  const formRef = useRef();
  const { login } = useAuth();
  const { email, password } = useSelector((state) => state.action);
  const [resendTimeout, setResendTimeout] = useState(59);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (email && resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout((prevTimeout) => {
          if (prevTimeout <= 1) {
            clearInterval(timer);
            return 0; // Reset the countdown
          }
          return prevTimeout - 1;
        });
      }, 1000);

      // Clean up the interval when component unmounts or email changes
      return () => {
        clearInterval(timer);
      };
    }
  }, [email, resendTimeout]);

  React.useEffect(() => {
    return () => {
      dispatch(resetCode());
    };
  }, [dispatch]);

  const handleResendCode = async (setErrors) => {
    try {
      const response = await resendCode({ email });
      if (response?.error) {
        setErrors({ submit: 'Ошибка отправки кода' });
      } else {
        setResendTimeout(59);
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка отправки кода' });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required('Код обязателен'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await verifyEmail({ email, code: values.code });

            if (response?.error) {
              setErrors({ submit: 'Неверный код' });
            } else {
              if (!password) {
                navigate('/login');
              }
              const res = await login({ email, password, social_link: email });
              if (res?.error) {
                setErrors({ submit: 'Что то пошло нет так' });
              }
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
          isSubmitting: isLoading,
          touched,
          values,
          setErrors,
          setFieldValue,
        }) => (
          <form noValidate onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack
                  spacing={0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  className={
                    (errors?.submit ? 'shake pin-error' : '') + (isLoading ? ' disabled' : '')
                  }
                >
                  <VerificationInput
                    autoFocus
                    length={4}
                    validChars="0123456789"
                    placeholder=" "
                    classNames={{
                      container: 'container',
                      character:
                        'character' + (isLoading || isResending || isVerifying ? ' disabled' : ''),
                      characterInactive: 'character--inactive',
                      characterSelected: 'character--selected',
                      characterFilled: 'character--filled',
                      characterError: 'character--error',
                    }}
                    onChange={(code) => {
                      setFieldValue('code', code);
                    }}
                    value={values.code}
                    onComplete={(code) => {
                      formRef.current.requestSubmit();
                    }}
                    disabled={isLoading || isResending || isVerifying}
                  />
                </Stack>
                <Stack
                  spacing={0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  pt={2}
                >
                  {touched.submit && errors.submit && (
                    <FormHelperText error id="helper-text-submit-signup">
                      {errors.submit}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {resendTimeout === 0 ? (
                <Grid item xs={12} mt={2}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.primary"
                    fontWeight="100"
                    onClick={() => {
                      handleResendCode(setErrors);
                    }}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      width: 'fit-content',
                      mx: 'auto',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: isLoading ? 'text.disabled' : 'primary.main',
                      },
                      color: isLoading ? 'text.disabled' : 'primary.main',
                    }}
                    disabled={isLoading}
                  >
                    Отправить код еще раз
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={12} mt={2}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.primary"
                    fontWeight="100"
                  >
                    Отправить повторно через:
                  </Typography>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.primary"
                    fontWeight="100"
                  >
                    {`00:${resendTimeout < 10 ? `0${resendTimeout}` : resendTimeout}`}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VerifyEmail;
