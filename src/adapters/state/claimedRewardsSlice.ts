import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import claimedRewardsService from "../../core/services/ClaimedRewardsService";
import { ParticipantId } from "../../core/domain/Participant";

import type { ClaimedRewards, RewardScore } from "../../core/domain/ClaimedRewards";
import type { Reward } from "../../core/domain/Reward";

type StateType = {
	claimedRewards: ClaimedRewards,
	loading: boolean,
	error: null | string
}

const initialState: StateType = {
	claimedRewards: {},
	loading: false,
	error: null
};

export const fetchClaimedRewards = createAsyncThunk('claimedRewards/fetch', async () => {
	const claimedRewards = await claimedRewardsService.getAllClaimedRewards();
	return claimedRewards;
});

export const addClaimedReward = createAsyncThunk('claimedRewards/add', async ({ participantId, reward, score, tasksDone }: { participantId: ParticipantId, reward: Reward, score: RewardScore, tasksDone: string[] }) => {
	const claimedRewards = await claimedRewardsService.addClaimedReward({ participantId, reward, score, tasksDone });
	return claimedRewards;
});

// export const removeClaimedReward = createAsyncThunk('claimedRewards/remove', async ({ date, participantId, taskId }: { date: Date, participantId: Participant, taskId: Task }) => {
// 	const claimedRewards = await claimedRewardsService.removeClaimedReward({ date, participantId, taskId });
// 	return claimedRewards;
// });

// export const removeClaimedRewardsForTaskId = createAsyncThunk('claimedRewards/removeForTaskId', async ({ taskId }: { taskId: TaskId }) => {
// 	const claimedRewards = await claimedRewardsService.removeClaimedRewardsForTaskId({ taskId });
// 	return claimedRewards;
// });
// export const removeClaimedRewardsForParticipantId = createAsyncThunk('claimedRewards/removeForParticipantId', async ({ participantId }: { participantId: ParticipantId }) => {
// 	const claimedRewards = await claimedRewardsService.removeClaimedRewardsForParticipantId({ participantId });
// 	return claimedRewards;
// });

const claimedRewardsSlice = createSlice({
	name: "claimedRewards",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClaimedRewards.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchClaimedRewards.fulfilled, (state, action) => {
				state.claimedRewards = action.payload;
				state.loading = false;
			})
			.addCase(fetchClaimedRewards.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load claimedRewards';
			})
			.addCase(addClaimedReward.fulfilled, (state, action) => {
				state.claimedRewards = action.payload;
			});
		// .addCase(removeClaimedReward.fulfilled, (state, action) => {
		// 	state.claimedRewards = action.payload;
		// })
		// .addCase(removeClaimedRewardsForTaskId.fulfilled, (state, action) => {
		// 	state.claimedRewards = action.payload;
		// });
	},
});

// export const { addReward, deleteReward } = claimedRewardsSlice.actions;

export default claimedRewardsSlice.reducer;
