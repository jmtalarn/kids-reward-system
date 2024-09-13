import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assessmentsService from "../../core/services/AssessmentsService";


const initialState = {
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
			});
	},
});

// export const { addReward, deleteReward } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
