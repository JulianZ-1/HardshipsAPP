import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import draculaTheme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={draculaTheme} >
      <CssBaseline />
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);