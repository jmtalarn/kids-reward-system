import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rewardsService from "../../core/services/RewardsService"
import { Reward } from '../../core/domain/Reward'

export const fetchRewards = createAsyncThunk('rewards/fetch', async () => {
	const rewards = await rewardsService.getAllRewards();
	return rewards;
});

export const addReward = createAsyncThunk('rewards/add', async (reward: Reward) => {
	const rewards = await rewardsService.addReward(reward);
	return rewards;
});

export const removeReward = createAsyncThunk('rewards/remove', async (rewardId: string) => {
	const rewards = await rewardsService.removeReward(rewardId);
	return rewards;
});

const initialState = {
	rewards: [],
	loading: false,
	error: null
};

const rewardsSlice = createSlice({
	name: "rewards",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRewards.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRewards.fulfilled, (state, action) => {
				state.rewards = action.payload;
				state.loading = false;
			})
			.addCase(fetchRewards.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load rewards';
			})
			.addCase(addReward.fulfilled, (state, action) => {
				state.rewards = action.payload;
			})
			.addCase(removeReward.fulfilled, (state, action) => {
				state.rewards = action.payload;
			});
	},
});

export default rewardsSlice.reducer;
