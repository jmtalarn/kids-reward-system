import { DialogOption } from './DialogOption';

// export type AssessmentId = typeof string;

export interface Assessment {
	// id?: AssessmentId;
	date: Date;
	participant: ParticipantId
	task: TaskId;
	score: DialogOption;
}
