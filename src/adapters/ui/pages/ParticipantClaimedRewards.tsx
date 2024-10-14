import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipants } from "../../state/participantsSlice";
import { RootState, AppDispatch } from '../../state/store';
import ParticipantClaimedRewards from '../components/ParticipantClaimedRewards';

const ParticipantClaimedRewardsPage = () => {
	const { participants } = useSelector((state: RootState) => state.participants);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchParticipants());
	}, []);

	const { id } = useParams();


	const participant = id ? participants.byId[id] : undefined;
	return (
		<ParticipantClaimedRewards participant={participant} />
	);
};

export default ParticipantClaimedRewardsPage;
