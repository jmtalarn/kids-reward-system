import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const Root = () => (
  <>
    <Outlet />
    <Navigation />
  </>
);
