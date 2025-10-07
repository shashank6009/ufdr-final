import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1F2937', // navy
    },
    secondary: {
      main: '#2563EB', // blue
    },
    background: {
      default: '#F6F7F8',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
      },
    },
  },
});
