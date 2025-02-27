// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000',
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];
  const paletteColor = ThemeOption({
    ...colors,
  });

  paletteColor.primary.main = '#ff66c4';
  paletteColor.primary.light = '#ff94d6';
  paletteColor.primary.lighter = '#ffb3e2';
  paletteColor.primary.dark = '#803362';
  paletteColor.primary.darker = '#331427';
  paletteColor.primary.contrastText = '#fff';
  paletteColor.secondary.main = '#6e5ae2';
  paletteColor.secondary.light = '#9a8ceb';
  paletteColor.secondary.lighter = '#b7adf1';
  paletteColor.secondary.dark = '#372d71';
  paletteColor.secondary.darker = '#16122d';
  paletteColor.secondary.contrastText = '#fff';

  return createTheme({
    palette: {
      mode: 'dark',
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[100],
        secondary: paletteColor.grey[200],
        disabled: paletteColor.grey[500],
      },
      action: {
        disabled: paletteColor.grey[600],
      },
      divider: paletteColor.grey[600],
      background: {
        paper: '#1f1f1f',
        default: '#121212',
      },
    },
  });
};

export default Palette;
