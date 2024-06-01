import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

export const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/config">Config</Link>
      </li>
    </ul>
  </nav>
);
