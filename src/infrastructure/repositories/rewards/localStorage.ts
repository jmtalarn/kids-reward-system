import { Reward, RewardId } from '../../../core/domain/Reward';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import { generateUuid } from '../../../core/domain/utils/generate-uuid';

const LOCAL_STORAGE_KEY = 'KRS_REWARDS';

const getAllRewards = async (): Promise<Reward[]> => {
	const rewards = localStorage.getItem(LOCAL_STORAGE_KEY);
	return rewards ? JSON.parse(rewards) : [];
};

const addReward = async (reward: Reward): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	let updatedRewards = [...rewards];

	if (!reward.id) {
		reward.id = generateUuid();
	}
	const foundIndex = rewards.findIndex((item: Reward) => item.id === reward.id);
	if (foundIndex > -1) {
		updatedRewards[foundIndex] = reward;
	} else {
		updatedRewards = [...rewards, reward];
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));
	return updatedRewards;
};

const removeReward = async (rewardId: RewardId): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	const updatedRewards = rewards.filter((reward: Reward) => reward.id !== rewardId);
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));


	return updatedRewards;
};

const removeParticipantFromRewards = async ({ participantId }: { participantId: ParticipantId }): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	const updatedRewards = rewards.map((reward: Reward) => {
		reward.participants = reward.participants?.filter((participant: Participant) => participant.id !== participantId);
		return reward;
	});
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));


	return updatedRewards;

};



export default {
	getAllRewards,
	addReward,
	removeReward,
	removeParticipantFromRewards
};
