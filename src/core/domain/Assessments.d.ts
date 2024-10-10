import { DialogOption } from './DialogOption';
import { ParticipantId } from './Participant';
import { TaskId } from './Task';

export type Assessments = Record<string, Record<ParticipantId, Record<TaskId, DialogOption['value']>>>;
