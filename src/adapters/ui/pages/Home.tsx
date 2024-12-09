import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import style from './Home.module.css';


export const Home = () => (
  <div className={style.home}>
    <div className={style.firstRow}>
      <div className={style.motd}>
        <h3><FormattedMessage defaultMessage={`Welcome, Habit Heroes! 🎯`} /></h3>
        <FormattedMessage
          defaultMessage={`Track your progress, claim your rewards, and turn good habits into great achievements. Ready to level up today?`}
        />
      </div>
      <Link to="/daily-tasks"><img src="./krs-logo.png" alt="An avatar of a kid, with some task icons around it" /></Link>
    </div>
    <Dashboard />
    <div className={style["home-links-section"]}>
      <ul>
        <li>
          <Link to="/why-to-use-it"><FormattedMessage defaultMessage={'Why to use this app?'} /></Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Home;
