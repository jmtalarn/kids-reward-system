import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';
import { Loading } from './Loading';

export const LoadingState = () => {
	const allLoading = [useSelector((state: RootState) => state.assessments.loading),
	useSelector((state: RootState) => state.participants.loading),
	useSelector((state: RootState) => state.rewards.loading),
	useSelector((state: RootState) => state.tasks.loading)
		//,useSelector((state: RootState) => state.settings.loading)
	];

	const show: boolean = allLoading.some(Boolean);

	return <Loading show={show} />;
};


export default Loading;
