import style from "./Loading.module.css";
import { Loader } from 'react-feather';


export const Loading = ({ show }: { show: boolean }) => {
	return show && <div className={style.wrapper} >
		<Loader
			className={style.loader}
		/>
	</div>;
};


export default Loading;
