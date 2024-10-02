import { useEffect, useState } from "react";
import style from "./Loading.module.css";
import { Loader } from 'react-feather';


export const Loading = ({ show }: { show: boolean }) => {
	const [hide, setHide] = useState<boolean>(show);

	useEffect(() => {
		setTimeout(() => { setHide(!show); }, show ? 0 : 999);
	}, [show]);

	return !hide && <div className={[style.wrapper, show ? style.enter : style.leave].filter(Boolean).join(" ")} >
		<Loader
			className={style.loader}
		/>
	</div>;
};


export default Loading;
