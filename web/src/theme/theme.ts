import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#0f4275',
      light: '#5089bf',
      dark: '#071e3c',
    },
    green: {
      main: 'rgba(0, 255, 0)',
      light: 'rgba(0, 255, 0, 0.5)',
      dark: '#0ed50e',
    },
    red: {
      main: 'rgba(255, 0, 0)',
      light: 'rgba(255, 0, 0, 0.5)',
    },
    background: {
      default: '#FFF',
      paper: 'rgba(0,0,0,0.5)',
    },
  },
  typography: {
    fontFamily: ['Playfair Display', 'serif'].join(','),
    allVariants: {
      color: '#fff',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          letterSpacing: '0.1em',
        },
      },
    },
  },
});
