import { Reward } from '../domain/Reward';


const LOCAL_STORAGE_KEY = 'KRS_REWARDS';

const getAllRewards = async (): Promise<Reward[]> => {
	const rewards = localStorage.getItem(LOCAL_STORAGE_KEY);
	return rewards ? JSON.parse(rewards) : [];
};

const addReward = async (reward: Reward): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	let updatedRewards;

	if (!reward.id) {
		reward.id = generateUuid();
		updatedRewards = [...rewards, reward];
	} else {
		updatedRewards = rewards.map(item => {
			if (item.id === reward.id) {
				return reward;
			}
			return item;
		});
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





export default {
	getAllRewards,
	addReward,
	removeReward
};
