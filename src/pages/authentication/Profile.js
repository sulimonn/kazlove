import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Container } from '@mui/material';

// project import
import ProfileForm from './auth-forms/AnketaForm';
import { useAuth } from 'contexts/index';

// ================================|| LOGIN ||================================ //

const Profile = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  if (!isAuth) return navigate('/login');

  return (
    <Container sx={{ backgroundColor: 'background.paper', my: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Создать анкету</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
