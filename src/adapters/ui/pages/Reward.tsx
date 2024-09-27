import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import RewardForm from '../components/RewardForm';
import { fetchRewards } from "../../state/rewardsSlice";
import { RootState, AppDispatch } from '../../state/store';

const RewardPage = () => {
	const { rewards } = useSelector((state: RootState) => state.rewards);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchRewards());
	}, []);

	const { id } = useParams();


	const reward = id ? rewards.byId[id] : {};
	return (
		<RewardForm reward={reward} />
	);
};

export default RewardPage;
