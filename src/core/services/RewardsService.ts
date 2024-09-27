import { Reward, RewardId } from '../domain/Reward';
import { ParticipantId } from '../domain/Participant';

import rewardsRepository from '../../infrastructure/repositories/rewards/localStorage';

const getAllRewards = async (): Promise<Reward[]> => {
	return rewardsRepository.getAllRewards();
};

const addReward = async (reward: Reward): Promise<Reward[]> => {
	return rewardsRepository.addReward(reward);
};

const removeReward = async (rewardId: RewardId): Promise<Reward[]> => {
	return rewardsRepository.removeReward(rewardId);
};

const removeParticipantFromRewards = async ({ participantId }: { participantId: ParticipantId }): Promise<Reward[]> => {
	return rewardsRepository.removeParticipantFromRewards({ participantId });
};


export default {
	getAllRewards,
	addReward,
	removeReward,
	removeParticipantFromRewards
};

