import assessmentsRepository from '../../infrastructure/repositories/assessments/localStorage';
import { ParticipantId } from '../domain/Participant';
import { TaskId } from '../domain/Task';
import { Assessment } from '../domain/Assessment';

const addAssessment = async ({ date, participantId, taskId, option }: { date: Date, participantId: ParticipantId, taskId: TaskId, option: DialogOption }): Promise<Assessment[]> => {
  return assessmentsRepository.addAssessment({ date, participantId, taskId, option });
}
const removeAssessment = async ({ date, participantId, taskId }: { date: Date, participantId: Participant, taskId: TaskId }): Promise<Assessment[]> => {
  return assessmentsRepository.removeAssessment({ date, participantId, taskId });
}

const removeAssessmentsForTaskId = async ({ taskId }: { taskId: TaskId }): Promise<Assessment[]> => {
  return assessmentsRepository.removeAssessmentsForTaskId({ taskId });
}
const removeAssessmentsForParticipantId = async ({ participantId }: { participantId: ParticipantId }): Promise<Assessment[]> => {
  return assessmentsRepository.removeAssessmentsForParticipantId({ participantId });
}

const getAllAssessments = async (): Promise<Assessment[]> => {
  return assessmentsRepository.getAllAssessments();
}


export default {
  getAllAssessments,
  addAssessment,
  removeAssessment,
  removeAssessmentsForTaskId,
  removeAssessmentsForParticipantId
}


