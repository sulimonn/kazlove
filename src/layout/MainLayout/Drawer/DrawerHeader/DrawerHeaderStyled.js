// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    height: '100%',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(open ? 3 : 0),
    paddingTop: theme.spacing(open ? 3 : 0),
    paddingBottom: theme.spacing(open ? 3 : 0),
    maxHeight: '100%',
  })
);

export default DrawerHeaderStyled;
