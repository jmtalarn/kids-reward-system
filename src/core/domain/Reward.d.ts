import { ParticipantId } from "./Participant";
import { RecurringEvent } from "./Recurring";

export type RewardId = typeof string;

export interface Reward {
	id?: RewardId;
	description?: string;
	participants?: ParticipantId[];
	recurring?: RecurringEvent;
}
