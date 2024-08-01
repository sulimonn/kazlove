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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// project import
import LogoSection from 'components/Logo';
import { setCity } from 'store/reducers/action';

// ==============================|| HEADER - CONTENT ||============================== //
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const HeaderContent = () => {
  const { city } = useSelector((state) => state.action);
  const { cities } = useSelector((state) => state.catalog);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(city);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  return (
    <>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ minHeight: '50px !important', justifyContent: 'space-between' }}
        >
          <LogoSection to="/" />
          <Box>
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
