import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import style from './Root.module.css';
import { LoadingState } from '../components/LoadingState';

export const Root = () => (
  <main className={style.main}>
    <Header />
    <div className={style.content}>
      <LoadingState />
      <Outlet />
    </div>
    <Navigation />
  </main>
);

export default Root;
