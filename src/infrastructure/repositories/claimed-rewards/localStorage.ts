import type { ClaimedRewards, RewardScore } from "../../../core/domain/ClaimedRewards";
import type { ParticipantId } from "../../../core/domain/Participant";
import type { Reward } from "../../../core/domain/Reward";
import { dateToShortISOString } from "../../../core/domain/utils/date-utils";
import { getRewardDueDate } from "../../../core/domain/utils/reward-utils";

const LOCAL_STORAGE_KEY = 'KRS_CLAIMED_REWARDS';

const getAllClaimedRewards = async (): Promise<ClaimedRewards> => {
	const claimedRewards = localStorage.getItem(LOCAL_STORAGE_KEY);
	return claimedRewards ? JSON.parse(claimedRewards) : {};
};

const addClaimedReward = async ({ participantId, reward, score }: { participantId: ParticipantId, reward: Reward, score: RewardScore }): Promise<ClaimedRewards> => {
	const dateKey = dateToShortISOString(getRewardDueDate(reward));
	const claimedRewards = await getAllClaimedRewards();

	if (!claimedRewards[participantId]) {
		claimedRewards[participantId] = {};
	}
	if (!claimedRewards[participantId][dateKey]) {
		claimedRewards[participantId][dateKey] = {};
	}
	claimedRewards[participantId][dateKey][reward.id] = { reward, score };

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(claimedRewards));
	return claimedRewards;
};



export default {
	getAllClaimedRewards,
	addClaimedReward,
};
