import { Assessment } from '../domain/Assessment';
const LOCAL_STORAGE_KEY = 'KRS_ASSESSMENTS';

const getAllAssessments = async (): Promise<Assessment[]> => {
	const assessments = localStorage.getItem(LOCAL_STORAGE_KEY);
	return assessments ? JSON.parse(assessments) : {};
};

const addAssessment = async ({ date, participantId, taskId, option }: { date: Date, participantId: ParticipantId, taskId: TaskId, option: DialogOption }): Promise<Assessment[]> => {
	const assessments = await getAllAssessments();
	if (!assessments[date]) {
		assessments[date] = {};
	}
	if (!assessments[date][participantId]) {
		assessments[date][participantId] = {};
	}
	assessments[date][participantId] = { ...assessments[date][participantId], [taskId]: option };

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
	return assessments;
};

const removeAssessment = async (participantId: string): Promise<Assessment[]> => {
	const assessments = await getAllAssessments();
	delete assessments[date][participantId].tasks[taskId];
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
	return assessments;
};

export default {
	getAllAssessments,
	addAssessment,
	removeAssessment
};
