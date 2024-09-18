import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import RewardForm from '../components/RewardForm';
import { fetchRewards } from "../../state/rewardsSlice";

const RewardPage = () => {
	const { rewards } = useSelector((state) => state.rewards);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRewards());
	}, []);

	const { id } = useParams();


	const reward = rewards.byId[id];
	return (
		<RewardForm reward={reward} />
	)
}

export default RewardPage
