import assessmentsRepository from '../../infrastructure/repositories/assessments/localStorage';
import { ParticipantId } from '../domain/Participant';
import { TaskId } from '../domain/Task';
import { Assessments } from '../domain/Assessments';
import { DialogOption } from '../domain/DialogOption';

const addAssessment = async ({ date, participantId, taskId, option }: { date: Date, participantId: ParticipantId, taskId: TaskId, option: DialogOption }): Promise<Assessments> => {
  return assessmentsRepository.addAssessment({ date, participantId, taskId, option });
};
const removeAssessment = async ({ date, participantId, taskId }: { date: Date, participantId: ParticipantId, taskId: TaskId }): Promise<Assessments> => {
  return assessmentsRepository.removeAssessment({ date, participantId, taskId });
};

const removeAssessmentsForTaskId = async ({ taskId }: { taskId: TaskId }): Promise<Assessments> => {
  return assessmentsRepository.removeAssessmentsForTaskId({ taskId });
};
const removeAssessmentsForParticipantId = async ({ participantId }: { participantId: ParticipantId }): Promise<Assessments> => {
  return assessmentsRepository.removeAssessmentsForParticipantId({ participantId });
};

const getAllAssessments = async (): Promise<Assessments> => {
  return assessmentsRepository.getAllAssessments();
};


export default {
  getAllAssessments,
  addAssessment,
  removeAssessment,
  removeAssessmentsForTaskId,
  removeAssessmentsForParticipantId
};


