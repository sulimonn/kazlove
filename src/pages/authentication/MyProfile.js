import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Container, Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// project import
import AnketaForm from './auth-forms/AnketaForm';
import { useAuth } from 'contexts/index';
import { useDeleteProfileMutation, useGetProfilePhotosQuery } from 'store/reducers/api';

// ================================|| LOGIN ||================================ //

const MyProfile = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { data: photos = [], isFetching } = useGetProfilePhotosQuery(profile?.id || 0);
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();
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
            <Button
              color="error"
              sx={{ textTransform: 'none' }}
              endIcon={<DeleteIcon />}
              onClick={async () => {
                const result = await deleteProfile(profile?.id || 0);
                if (result?.data) {
                  navigate('/login');
                }
              }}
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
