import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
  Container,
  Toolbar,
  Button,
  Typography,
  Box,
  Modal,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';

// project import
import LogoSection from 'components/Logo';
import { setCity } from 'store/reducers/action';
import { openDrawer, openModal } from 'store/reducers/menu';
import { useAuth } from 'contexts/index';
import { useFetchCitiesQuery } from 'store/reducers/api';
import BalanceComp from 'layout/MainLayout/BalanceComp';

// ==============================|| HEADER - CONTENT ||============================== //
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const HeaderContent = () => {
  const { isAuth, logout, profile } = useAuth();
  const { data: cities = [] } = useFetchCitiesQuery();
  const { city } = useSelector((state) => state.action);
  const { modalOpen: open } = useSelector((state) => state.menu);
  const [selected, setSelected] = React.useState(city);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openModal({ modalOpen: true }));
  };
  const handleClose = () => {
    dispatch(openModal({ modalOpen: false }));
  };

  return (
    <>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ minHeight: '50px !important', justifyContent: 'space-between' }}
        >
          <LogoSection
            sx={{ width: { xs: '50px', sm: '100px' }, height: { xs: '50px', sm: '100px' } }}
            to="/"
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: isAuth ? 'center' : 'center',
                ml: isAuth ? 'auto' : 0,
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  color="primary"
                  startIcon={<LocationOnIcon />}
                  onClick={handleOpen}
                  sx={{ textTransform: 'none' }}
                >
                  {selected !== -2
                    ? [...cities, { id: -1, name: 'Все города' }]?.find(
                        (item) => item.id === selected
                      )?.name
                    : 'Выбрать город'}
                </Button>
              </Box>
              {!isAuth ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }} ml={2}>
                  <Button component={Link} to="/login" color="inherit">
                    Войти
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ mx: '5px' }}>
                    /
                  </Typography>
                  <Button component={Link} to="/register" color="inherit">
                    Регистрация
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }} ml={2}>
                  <BalanceComp />
                  <Button
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Выйти
                  </Button>
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                component={Link}
                to={isAuth ? (!!profile ? '/profile/me' : '/profile/add') : '/login'}
                color={
                  profile?.id
                    ? profile?.approved === 1 && profile?.checked === 1
                      ? 'primary'
                      : 'error'
                    : 'primary'
                }
                variant="contained"
                style={{ marginLeft: '10px', textTransform: 'none' }}
              >
                {profile?.id
                  ? profile?.approved === 1 && profile?.checked === 1
                    ? 'Моя анкета'
                    : profile?.checked === 0 && profile?.approved === 0
                      ? 'Рассматривается'
                      : 'Анкета отклонена'
                  : 'Добавить анкету'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton color="primary" onClick={() => dispatch(openDrawer({ drawerOpen: true }))}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Выберите свой город
          </Typography>
          <Select
            value={selected || -1}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            placeholder="Выберите город"
            sx={{ width: '100%', my: 3, borderRadius: 40 }}
          >
            <MenuItem value={-2} sx={{ color: 'text.secondary' }} disabled>
              Выбрать город
            </MenuItem>

            <MenuItem value={-1}>Все города</MenuItem>

            {cities?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={() => {
              dispatch(setCity(selected));
              handleClose();
            }}
            variant="contained"
            color="primary"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            Выбрать
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default HeaderContent;
