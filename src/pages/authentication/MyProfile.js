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

import DeleteIcon from '@mui/icons-material/Delete';

// project import
import AnketaForm from './auth-forms/AnketaForm';
import { useAuth } from 'contexts/index';
import {
  useDeleteProfileMutation,
  useFetchMediaQuery,
  useGetProfilePhotosQuery,
} from 'store/reducers/api';
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
  const { profile } = useAuth();
  const { data: photos = [], isFetching } = useGetProfilePhotosQuery(profile?.id || 0);
  const { data: media = [], isFetching: mediaIsFetching } = useFetchMediaQuery(profile?.id || 0);
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();

  if (!profile) return navigate('/');

  return (
    <>
      <Container sx={{ backgroundColor: 'background.paper', my: 8 }}>
        <TabContext value={value}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                justifyContent="space-between"
                alignItems="baseline"
                sx={{ mb: { xs: -0.3 } }}
              >
                <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{}}>
                  <Tab label={<Typography variant="h4">Анкета</Typography>} value="profile" />
                  {profile?.checked && profile?.approved && (
                    <Tab label={<Typography variant="h4">Тариф</Typography>} value="tariff" />
                  )}
                </TabList>
                {value === 'profile' && (
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
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="profile">
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
                  isFetching={isFetching || mediaIsFetching}
                  media={
                    media.length > 0
                      ? media.map((photo) => ({
                          id: photo[0],
                          upload: process.env.REACT_APP_SERVER_URL + photo[1],
                          media: 'video',
                        }))
                      : []
                  }
                />
              </TabPanel>
              <TabPanel value="tariff">
                <TariffForm profile={profile} />
              </TabPanel>
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
