import { Assessments } from '../../../core/domain/Assessments';
import { ParticipantId } from '../../../core/domain/Participant';
import { TaskId } from '../../../core/domain/Task';
import { DialogOption } from '../../../core/domain/DialogOption';
import { dateToShortISOString } from '../../../core/domain/utils/date-utils';
const LOCAL_STORAGE_KEY = 'KRS_ASSESSMENTS';

const getAllAssessments = async (): Promise<Assessments> => {
	const assessments = localStorage.getItem(LOCAL_STORAGE_KEY);
	return assessments ? JSON.parse(assessments) : {};
};

const addAssessment = async ({ date, participantId, taskId, option }: { date: Date, participantId: ParticipantId, taskId: TaskId, option: DialogOption }): Promise<Assessments> => {
	const dateKey = dateToShortISOString(date);
	const assessments = await getAllAssessments();
	if (!assessments[dateKey]) {
		assessments[dateKey] = {};
	}
	if (!assessments[dateKey][participantId]) {
		assessments[dateKey][participantId] = {};
	}
	assessments[dateKey][participantId] = { ...assessments[dateKey][participantId], [taskId]: option.value };

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
	return assessments;
};

const removeAssessment = async ({ date, participantId, taskId }: { date: Date, participantId: ParticipantId, taskId: TaskId }): Promise<Assessments> => {
	const dateKey = dateToShortISOString(date);
	const assessments = await getAllAssessments();
	delete assessments[dateKey][participantId][taskId];
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
	return assessments;
};

const removeAssessmentsForTaskId = async ({ taskId }: { taskId: TaskId }): Promise<Assessments> => {
	const assessments = await getAllAssessments();
	const updatedAssessments = JSON.parse(JSON.stringify(assessments, (k, v) => (k === taskId) ? undefined : v));
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAssessments));
	return updatedAssessments;
};

const removeAssessmentsForParticipantId = async ({ participantId }: { participantId: ParticipantId }): Promise<Assessments> => {
	const assessments = await getAllAssessments();
	const updatedAssessments = JSON.parse(JSON.stringify(assessments, (k, v) => (k === participantId) ? undefined : v));
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAssessments));
	return updatedAssessments;
};


export default {
	getAllAssessments,
	addAssessment,
	removeAssessment,
	removeAssessmentsForTaskId,
	removeAssessmentsForParticipantId
};
