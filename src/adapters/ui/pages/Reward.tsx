
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import RewardForm from '../components/RewardForm';

const RewardPage = () => {
	const { id } = useParams();
	const { rewards } = useSelector((state) => state.rewards);
	const reward = rewards.byId[id];
	return (
		<RewardForm reward={reward} />
	)
}

export default RewardPage
