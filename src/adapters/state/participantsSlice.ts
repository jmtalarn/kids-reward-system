import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import participantsService from "../../core/services/ParticipantsService"
import { Participant } from '../../core/domain/Participant'
import { removeAssessmentsForParticipantId } from "./assessmentsSlice";
import { removeParticipantFromRewards } from "./rewardsSlice";

export const fetchParticipants = createAsyncThunk('participants/fetch', async () => {
	const participants = await participantsService.getAllParticipants();
	return participants;
});

export const addParticipant = createAsyncThunk('participants/add', async (participant: Participant) => {
	const participants = await participantsService.addParticipant(participant);
	return participants;
});

export const removeParticipant = createAsyncThunk('participants/remove', async (participantId: string, { dispatch }) => {
	const participants = await participantsService.removeParticipant(participantId);
	dispatch(removeAssessmentsForParticipantId({ participantId }));
	dispatch(removeParticipantFromRewards({ participantId }));
	return participants;
});

const normalizeParticipants = (participants: Participant[]) => (participants.reduce((acc, curr) => {
	acc.byId[curr.id] = curr;
	acc.allIds.push(curr.id);
	return acc;
}, { byId: {}, allIds: [] }));

const initialState = {
	participants: { byId: {}, allIds: [] },
	loading: false,
	error: null
};

const participantsSlice = createSlice({
	name: "participants",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchParticipants.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchParticipants.fulfilled, (state, action) => {
				state.participants = normalizeParticipants(action.payload);
				state.loading = false;
			})
			.addCase(fetchParticipants.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load participants';
			})
			.addCase(addParticipant.fulfilled, (state, action) => {
				state.participants = normalizeParticipants(action.payload);
			})
			.addCase(removeParticipant.fulfilled, (state, action) => {
				state.participants = normalizeParticipants(action.payload);
			});
	},
});



// export const { addParticipant, deleteParticipant } = participantsSlice.actions;

export default participantsSlice.reducer;
