import { Settings } from './Settings';
import style from './Header.module.css';

export const Header = () => (
	<header className={style.header}>
		<h1 className={style.title}>kids-reward-system</h1>
		<Settings />
	</header>
);

export default Header;
