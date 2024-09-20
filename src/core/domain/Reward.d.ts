import { ParticipantId } from "./Participant";
export type RewardId = typeof string;

export interface Reward {
	id?: RewardId;
	description: string;
	participants: ParticipantId[];
	dueDate: string;
	daysToCount: number;
	startingDate: string;
}
