import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import participantsService from "../../core/services/ParticipantsService"
import { Participant } from '../../core/domain/Participant'



export const fetchParticipants = createAsyncThunk('participants/fetch', async () => {
	const participants = await participantsService.getAllParticipants();
	return participants;
});

export const addParticipant = createAsyncThunk('participants/add', async (participant: Participant) => {
	const participants = await participantsService.addParticipant(participant);
	return participants;
});

export const removeParticipant = createAsyncThunk('participants/remove', async (participantId: string) => {
	const participants = await participantsService.removeParticipant(participantId);
	return participants;
});

const initialState = {
	participants: [],
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
				state.participants = action.payload;
				state.loading = false;
			})
			.addCase(fetchParticipants.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load participants';
			})
			.addCase(addParticipant.fulfilled, (state, action) => {
				state.participants = action.payload;
			})
			.addCase(removeParticipant.fulfilled, (state, action) => {
				state.participants = action.payload;
			});
	},
});



// export const { addParticipant, deleteParticipant } = participantsSlice.actions;

export default participantsSlice.reducer;
