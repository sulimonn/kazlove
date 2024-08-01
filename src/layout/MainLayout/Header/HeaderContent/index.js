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
  const { city } = useSelector((state) => state.action);
  const { cities } = useSelector((state) => state.catalog);
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
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <div>
                <Button color="primary" startIcon={<LocationOnIcon />} onClick={handleOpen}>
                  {city}
                </Button>
              </div>
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
            </Box>
            <Box display="flex" justifyContent="flex-end">
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
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            sx={{ width: '100%', my: 3, borderRadius: 40 }}
          >
            {cities.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
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
