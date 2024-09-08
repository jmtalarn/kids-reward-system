import { Reward } from '../domain/Reward';


const LOCAL_STORAGE_KEY = 'KRS_REWARDS';

const getAllRewards = async (): Promise<Reward[]> => {
	const rewards = localStorage.getItem(LOCAL_STORAGE_KEY);
	return rewards ? JSON.parse(rewards) : [];
};

const addReward = async (newReward: Reward): Promise<Reward[]> => {
	const rewards = await getAllRewards();
	const updatedRewards = [...rewards, newReward];
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
