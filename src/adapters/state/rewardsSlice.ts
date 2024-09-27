import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rewardsService from "../../core/services/RewardsService";
import { Reward, RewardId } from '../../core/domain/Reward';
import { ParticipantId } from '../../core/domain/Participant';
import { removeTask } from "./tasksSlice";

export const fetchRewards = createAsyncThunk('rewards/fetch', async () => {
	const rewards = await rewardsService.getAllRewards();
	return rewards;
});

export const addReward = createAsyncThunk('rewards/add', async (reward: Reward) => {
	const rewards = await rewardsService.addReward(reward);
	return rewards;
});

export const removeReward = createAsyncThunk('rewards/remove', async (rewardId: RewardId, { dispatch }) => {
	const rewards = await rewardsService.removeReward(rewardId);
	dispatch(removeTask({ rewardId }));
	return rewards;
});

export const removeParticipantFromRewards = createAsyncThunk('rewards/removeParticipant', async ({ participantId }: { participantId: ParticipantId }) => {
	const rewards = await rewardsService.removeParticipantFromRewards({ participantId });
	return rewards;
});

type StateType = {
	rewards: {
		byId: Record<RewardId, Reward>,
		allIds: RewardId[]
	},
	loading: boolean,
	error: string | null
}

const initialState: StateType = {
	rewards: { byId: {}, allIds: [] },
	loading: false,
	error: null
};

const normalizeRewards = (rewards: Reward[]) => (rewards.reduce((acc: StateType['rewards'], curr: Reward) => {
	acc.byId[curr.id] = curr;
	acc.allIds.push(curr.id);

	return acc;
}, { byId: {}, allIds: [] }));

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
				state.rewards = normalizeRewards(action.payload);
				state.loading = false;
			})
			.addCase(fetchRewards.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load rewards';
			})
			.addCase(addReward.fulfilled, (state, action) => {
				state.rewards = normalizeRewards(action.payload);
			})
			.addCase(removeReward.fulfilled, (state, action) => {
				state.rewards = normalizeRewards(action.payload);
			})
			.addCase(removeParticipantFromRewards.fulfilled, (state, action) => {
				state.rewards = normalizeRewards(action.payload);
			});
	},
});

export default rewardsSlice.reducer;
