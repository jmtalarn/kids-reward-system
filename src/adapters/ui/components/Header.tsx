import LanguageSelector from './LanguageSelector';
import style from './Header.module.css';

export const Header = () => (
	<header className={style.header}>
		<h1 className={style.title}>kids-reward-system</h1>
		<LanguageSelector />
	</header>
);

export default Header;
