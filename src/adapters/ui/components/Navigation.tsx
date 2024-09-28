import { Link } from 'react-router-dom';
import { Home, Users, Award, List } from 'react-feather';
import style from './Navigation.module.css';
import { FormattedMessage } from 'react-intl';

export const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <Link to="/" className={style.link}>
          <Home /> <FormattedMessage defaultMessage={'Home'} />
        </Link>
      </li>
      <li>
        <Link to="/daily-tasks" className={style.link}>
          <List /> <FormattedMessage defaultMessage={'Daily tasks'} />
        </Link>
      </li>
      <li>
        <Link to="/participants" className={style.link}>
          <Users /> <FormattedMessage defaultMessage={'Participants'} />
        </Link>
      </li>
      <li>
        <Link to="/rewards" className={style.link}>
          <Award /> <FormattedMessage defaultMessage={'Rewards'} />
        </Link>
      </li>
    </ul>
  </nav>
);
