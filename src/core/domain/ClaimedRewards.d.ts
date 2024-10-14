import { ParticipantId } from './Participant';
import { Reward, RewardId } from './Reward';

export type RewardScore = [number, number];

export type ClaimedReward = {
	reward: Reward;
	score: RewardScore;
}
export type ClaimedRewards = Record<ParticipantId, Record<string, Record<RewardId, ClaimedReward>>>;