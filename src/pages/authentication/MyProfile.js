// material-ui
import { Grid, Stack, Typography, Container } from '@mui/material';

// project import
import AnketaForm from './auth-forms/AnketaForm';
import { useAuth } from 'contexts/index';
import { useGetProfilePhotosQuery } from 'store/reducers/api';
import Loader from 'components/Loader';

// ================================|| LOGIN ||================================ //

const MyProfile = () => {
  const { profile } = useAuth();
  const { data: photos = [], isFetching } = useGetProfilePhotosQuery(profile?.id || 0);
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
            <Typography variant="h3">Моя анкета</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AnketaForm
            profile={profile}
            photos={
              photos.length > 0
                ? photos.map((photo) => ({
                    id: photo[0],
                    upload: process.env.REACT_APP_SERVER_URL + photo[1],
                  }))
                : []
            }
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyProfile;
