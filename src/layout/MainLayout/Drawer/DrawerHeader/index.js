import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Button, Typography, Box } from '@mui/material';

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';
import { openDrawer, openModal } from 'store/reducers/menu';
import { useAuth } from 'contexts/index';
import { useFetchCitiesQuery, useHideProfileMutation } from 'store/reducers/api';
import BalanceComp from 'layout/MainLayout/BalanceComp';
import TariffForm from 'pages/authentication/auth-forms/TariffForm';

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
  const [hideProfile, { isLoading: isHiding }] = useHideProfileMutation();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="column" spacing={1} alignItems="start" pb={5} mb={5} pr={2} height="100%">
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
                {city !== -2
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
              profile?.id && (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <BalanceComp />
                </Box>
              )
            )}
          </Box>
          <Stack direction="column" spacing={1}>
            <Button
              component={Link}
              to={isAuth ? (!!profile ? '/profile/me' : '/profile/add') : '/login'}
              color={
                profile?.approved === 1 && profile?.checked === 1 ? 'primary' : 'error' || 'primary'
              }
              variant="contained"
              sx={{ textTransform: 'none', width: 'fit-content', py: 0.5 }}
              onClick={() => {
                dispatch(openDrawer({ drawerOpen: false, drawerType: 'profile' }));
              }}
            >
              {profile?.id
                ? profile?.approved === 1 && profile?.checked === 1
                  ? 'Моя анкета'
                  : profile?.checked === 0 && profile?.approved === 0
                    ? 'Рассматривается'
                    : 'Анкета отклонена'
                : 'Добавить анкету'}
            </Button>

            {profile?.id && (
              <Button
                variant={profile?.hidden === 0 ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() =>
                  hideProfile({
                    id: profile?.id,
                    data: { hidden: profile?.hidden === 0 ? 1 : 0 },
                  })
                }
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: 'fit-content',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  textTransform: 'none',
                  transition: 'transform 0.3s ease-in-out', // Плавный переход
                  flexDirection: 'row',
                }}
                disabled={isHiding}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'none',
                    transition: 'transform 0.3s ease-in-out', // Плавное изменение позиции
                    transform: profile?.hidden === 1 ? 'translateX(30px)' : 'translateX(0)', // Плавно сдвигаем текст
                  }}
                >
                  {profile?.hidden === 1 ? 'Показать' : 'Скрыть анкету'}
                </Typography>
                <RadioButtonCheckedIcon
                  sx={{
                    transition: 'transform 0.3s ease-in-out', // Плавное изменение позиции
                    transform: profile?.hidden === 1 ? 'translateX(-80px)' : 'translateX(0)', // Плавно сдвигаем иконку
                  }}
                />
              </Button>
            )}
          </Stack>
        </Box>
        {profile?.id && profile?.approved === 1 && profile?.hidden === 0 && (
          <TariffForm profile={profile} />
        )}
        {isAuth && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
