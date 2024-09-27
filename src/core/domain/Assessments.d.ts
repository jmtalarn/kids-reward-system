import { DialogOption } from './DialogOption';
import { ParticipantId } from './Participant';
import { TaskId } from './Task';

// export type AssessmentId = typeof string;

// export interface Assessments {
// 	[key: string]: { [key: ParticipantId]: { [key: TaskId]: DialogOption } }
// }

export type Assessments = Record<string, Record<ParticipantId, Record<TaskId, DialogOption['value']>>>;
