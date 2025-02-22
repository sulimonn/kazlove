import React from 'react';
import { useSelector } from 'react-redux';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import VerifyForm from './auth-forms/VerifyForm';
import AuthWrapper from './AuthWrapper';
import { maskEmail } from 'utils/password-strength';

// ================================|| REGISTER ||================================ //

const EmailVerify = () => {
  const { email } = useSelector((state) => state.action);

  if (!email) {
    window.location.replace('/register');
  }
  return (
    <AuthWrapper>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <Stack
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            spacing={2}
          >
            <Typography variant="h3">Потвердите почту</Typography>
            <Typography variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Код подтверждения отправлен на почту {maskEmail(email)}, просьба не обновлять страницу
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <VerifyForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default EmailVerify;
