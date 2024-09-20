import { Reward } from '../domain/Reward';
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
	const foundIndex = rewards.findIndex(item => item.id === reward.id);
	if (foundIndex > -1) {
		updatedRewards[foundIndex] = reward;
	} else {
		updatedRewards = [...rewards, reward];
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));
	return updatedRewards;
};

const removeReward = async (rewardId: string): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	const updatedRewards = rewards.filter(reward => reward.id !== rewardId);
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));


	return updatedRewards;
};

const removeParticipantFromRewards = async ({ participantId }: { rewardId: RewardId, participantId: PartipantId }): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	const updatedRewards = rewards.map(reward => {
		reward.participants = reward.participants.filter(participant => participant.id !== participantId);
		return reward
	});
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRewards));


	return updatedRewards;

}



export default {
	getAllRewards,
	addReward,
	removeReward,
	removeParticipantFromRewards
};
