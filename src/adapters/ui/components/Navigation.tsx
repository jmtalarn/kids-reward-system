import { Link } from 'react-router-dom';
import { Home, Users, Award, List } from 'react-feather';
import style from './Navigation.module.css';

export const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <Link to="/" className={style.link}>
          <Home /> Home
        </Link>
      </li>
      <li>
        <Link to="/daily-tasks" className={style.link}>
          <List /> Daily Tasks
        </Link>
      </li>
      <li>
        <Link to="/participants" className={style.link}>
          <Users /> Participants
        </Link>
      </li>
      <li>
        <Link to="/rewards" className={style.link}>
          <Award /> Rewards
        </Link>
      </li>
    </ul>
  </nav>
);
