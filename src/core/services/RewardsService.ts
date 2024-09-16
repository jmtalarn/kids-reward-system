import { Reward } from '../domain/Reward';

import rewardsRepository from '../../infrastructure/repositories/rewards/localStorage';

const getAllRewards = async (): Promise<Reward[]> => {
	return rewardsRepository.getAllRewards();
};

const addReward = async (reward: Reward): Promise<Reward[]> => {
	return rewardsRepository.addReward(reward);
};

const removeReward = async (rewardId: string): Promise<Reward[]> => {
	return rewardsRepository.removeReward(rewardId);
}

export default {
	getAllRewards,
	addReward,
	removeReward
};
