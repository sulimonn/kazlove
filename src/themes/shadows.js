// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

const CustomShadows = (theme) => ({
  button: `0 2px #0000000b`,
  text: `0 -1px 0 rgb(0 0 0 / 12%)`,
  z1: `0px 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
  card: `20px 20px 10px ${alpha(theme.palette.primary.main, 5)}`,
  // only available in paid version
});

export default CustomShadows;
