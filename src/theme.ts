import { createTheme } from '@mui/material/styles';

const draculaTheme = createTheme({
  palette: {
    primary: {
      main: '#6272a4', // Dracula purple
    },
    secondary: {
      main: '#ff79c6', // Dracula pink
    },
    background: {
      default: '#282a36', // Dracula background
      paper: '#44475a', // Dracula darker background
    },
    text: {
      primary: '#f8f8f2', // Dracula foreground
      secondary: '#bd93f9', // Dracula light purple
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // You can use any preferred font
  },
});

export default draculaTheme;