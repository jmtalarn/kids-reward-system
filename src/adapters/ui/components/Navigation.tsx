import { Link } from 'react-router-dom';
import { Home, Users, Award } from 'react-feather';
import style from './Navigation.module.css';

export const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <Link to="/">
          <Home /> Home
        </Link>
      </li>
      <li>
        <Link to="/participants">
          <Users /> Participants
        </Link>
      </li>
      <li>
        <Link to="/rewards">
          <Award /> Rewards
        </Link>
      </li>
    </ul>
  </nav>
);
