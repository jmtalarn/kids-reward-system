import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import style from './Home.module.css';

const text = `Deserunt ad commodo pariatur consectetur minim adipisicing pariatur labore deserunt excepteur eiusmod eu aliquip consectetur. Nisi
      voluptate esse dolor ad tempor nostrud velit. Pariatur nostrud eiusmod excepteur sint ut magna amet consequat velit. Ullamco cillum amet
      culpa voluptate reprehenderit adipisicing Lorem ad proident exercitation magna sit amet. Voluptate quis sint duis deserunt sunt commodo
      anim incididunt sunt deserunt labore nisi est aute. In ipsum quis nostrud do enim irure.`;

export const Home = () => (
  <>
    <p>
      <FormattedMessage defaultMessage={text} />
    </p>
    <Dashboard />
    <div className={style["home-links-section"]}>
      <ul>
        <li>
          <Link to="/why-to-use-it"><FormattedMessage defaultMessage={'Why to use this app?'} /></Link>
        </li>
      </ul>
    </div>
  </>
);

export default Home;
