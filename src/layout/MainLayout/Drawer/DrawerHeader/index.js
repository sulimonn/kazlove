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

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.action);

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="column" spacing={1} alignItems="start" mt={2}>
        <Logo to="/" />
        <Box>
          <Box my={2}>
            <div>
              <Button
                color="primary"
                startIcon={<LocationOnIcon />}
                onClick={() => {
                  dispatch(openModal({ modalOpen: true }));
                }}
              >
                {city}
              </Button>
            </div>
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
          </Box>
          <Box>
            <Button
              component={Link}
              to="/form"
              color="primary"
              variant="contained"
              style={{ marginLeft: '10px' }}
            >
              Добавить анкету
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
