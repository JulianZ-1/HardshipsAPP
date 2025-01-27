import { createBrowserRouter } from 'react-router-dom';
import MainScreen from '../pages/MainScreen';
import HardshipFormScreen from '../pages/HardshipFormScreen';
import HardshipEditScreen from '../pages/HardshipEditScreen';
import HardshipsListScreen from '../pages/HardshipsListScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainScreen />,
  },
  {
    path: '/debts',
    element: <HardshipsListScreen />,
  },
  {
    path: '/hardship/create',
    element: <HardshipFormScreen />,
  },
  {
    path: '/hardship/edit',
    element: <HardshipEditScreen />,
  },
  {
    path: '/hardship/form',
    element: <HardshipFormScreen />,
  },
]);