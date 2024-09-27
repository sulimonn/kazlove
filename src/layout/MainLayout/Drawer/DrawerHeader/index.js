import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Button, Typography, Box } from '@mui/material';

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';
import { openModal } from 'store/reducers/menu';
import { useAuth } from 'contexts/index';
import { useFetchCitiesQuery } from 'store/reducers/api';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const { profile, isAuth, logout } = useAuth();
  const theme = useTheme();
  const { data: cities = [] } = useFetchCitiesQuery();
  const { city } = useSelector((state) => state.action);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openModal({ modalOpen: true }));
  };

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="column" spacing={1} alignItems="start" mt={2}>
        <Logo to="/" />
        <Box>
          <Box my={2} display={!isAuth ? 'block' : 'flex'} flexWrap="wrap">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="primary"
                startIcon={<LocationOnIcon />}
                onClick={handleOpen}
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                {city
                  ? [...cities, { id: -1, name: 'Все города' }]?.find((item) => item.id === city)
                      ?.name
                  : 'Выбрать город'}
              </Button>
            </Box>
            {!isAuth ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Button
                  color="secondary"
                  onClick={() => {
                    logout();
                  }}
                >
                  Выйти
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            <Button
              component={Link}
              to={!!profile ? '/profile/me' : '/profile/add'}
              color="primary"
              variant="contained"
            >
              {!!profile ? 'Моя анкета' : 'Добавить анкету'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
