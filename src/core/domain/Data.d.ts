import { Task } from './Task';
import { DialogOption } from './DialogOption';
import { Participant } from './Participant';
}

type TaskId = string;
type ParticipantId = string;


export type ParticipantAssessment = Record<string, Task && { assessment: DialogOption } >;
export type ParticipantData = Record<string, Participant & { tasks: ParticipantAssessment }>;
export type DateParticipantRecord = Record<Date, ParticipantData>;

export type DateRewardRecord = Record<string, Participant & { reward: string }>;
export type DateRewardRecord = Record<Date, DateRewardRecord>;


export type Data = {
	assessments: DateParticipantRecord;
	rewards: DateRewardRecord;
}

