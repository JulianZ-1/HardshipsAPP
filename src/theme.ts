import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#415A77',
      contrastText: '#E0E1DD',
    },
    secondary: {
      main: '#778DA9',    // Secondary gray-blue
      contrastText: '#0D1B2A',  // Dark text
    },
    background: {
      default: '#0D1B2A',  // Dark navy background
      paper: '#1B263B',    // Slightly lighter navy for surfaces
    },
    text: {
      primary: '#E0E1DD',  // Off-white main text
      secondary: '#778DA9', // Gray-blue secondary text
    },
    divider: '#1B263B',    // Divider color
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#E0E1DD',
      fontWeight: 500,
    },
    h2: {
      color: '#E0E1DD',
      fontWeight: 500,
    },
    // Add more typography variants as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#415A77',
          '&:hover': {
            backgroundColor: '#344A66',
          },
        },
        outlined: {
          borderColor: '#778DA9',
          color: '#778DA9',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B263B',
        },
      },
    },
  },
});

export default customTheme;