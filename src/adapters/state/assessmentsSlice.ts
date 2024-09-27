import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assessmentsService from "../../core/services/AssessmentsService";
import { Task, TaskId } from "../../core/domain/Task";
import { Participant, ParticipantId } from "../../core/domain/Participant";
import { DialogOption } from "../../core/domain/DialogOption";
import { Assessments as AssessmentsType } from "../../core/domain/Assessments";

type StateType = {
	assessments: AssessmentsType,
	loading: boolean,
	error: null | string
}

const initialState: StateType = {
	assessments: {},
	loading: false,
	error: null
};

export const fetchAssessments = createAsyncThunk('assessments/fetch', async () => {
	const assessments = await assessmentsService.getAllAssessments();
	return assessments;
});

export const addAssessment = createAsyncThunk('assessments/add', async ({ date, participantId, taskId, option }: { date: Date, participantId: ParticipantId, taskId: TaskId, option: DialogOption }) => {
	const assessments = await assessmentsService.addAssessment({ date, participantId, taskId, option });
	return assessments;
});

export const removeAssessment = createAsyncThunk('assessments/remove', async ({ date, participantId, taskId }: { date: Date, participantId: Participant, taskId: Task }) => {
	const assessments = await assessmentsService.removeAssessment({ date, participantId, taskId });
	return assessments;
});

export const removeAssessmentsForTaskId = createAsyncThunk('assessments/removeForTaskId', async ({ taskId }: { taskId: TaskId }) => {
	const assessments = await assessmentsService.removeAssessmentsForTaskId({ taskId });
	return assessments;
});
export const removeAssessmentsForParticipantId = createAsyncThunk('assessments/removeForParticipantId', async ({ participantId }: { participantId: ParticipantId }) => {
	const assessments = await assessmentsService.removeAssessmentsForParticipantId({ participantId });
	return assessments;
});
const assessmentsSlice = createSlice({
	name: "assessments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAssessments.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAssessments.fulfilled, (state, action) => {
				state.assessments = action.payload;
				state.loading = false;
			})
			.addCase(fetchAssessments.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load assessments';
			})
			.addCase(addAssessment.fulfilled, (state, action) => {
				state.assessments = action.payload;
			})
			.addCase(removeAssessment.fulfilled, (state, action) => {
				state.assessments = action.payload;
			})
			.addCase(removeAssessmentsForTaskId.fulfilled, (state, action) => {
				state.assessments = action.payload;
			});
	},
});

// export const { addReward, deleteReward } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
