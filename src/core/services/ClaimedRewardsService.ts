import claimedRewardsRepository from '../../infrastructure/repositories/claimed-rewards/localStorage';
import type { ClaimedRewards, RewardScore } from '../domain/ClaimedRewards';
import type { ParticipantId } from '../domain/Participant';
import type { Reward } from '../domain/Reward';


const addClaimedReward = async ({ participantId, reward, score }: { participantId: ParticipantId, reward: Reward, score: RewardScore }): Promise<ClaimedRewards> => {
  return claimedRewardsRepository.addClaimedReward({ participantId, reward, score });
};

const getAllClaimedRewards = async (): Promise<ClaimedRewards> => {
  return claimedRewardsRepository.getAllClaimedRewards();
};


export default {
  getAllClaimedRewards,
  addClaimedReward
};


