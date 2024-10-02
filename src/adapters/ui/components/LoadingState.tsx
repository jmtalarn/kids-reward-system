import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';
import { Loading } from './Loading';

export const LoadingState = () => {
	const allState = useSelector((state: RootState) => state);

	const show: boolean = Object.values(allState).filter(item => (typeof item).toString() === "StateType").some(item => (item as { loading?: boolean }).loading);

	return <Loading show={show} />;
};


export default Loading;
