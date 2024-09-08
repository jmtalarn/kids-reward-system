import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	rewards: [],
};

const rewardsSlice = createSlice({
	name: "rewards",
	initialState,
	reducers: {
		addReward: (state, action) => {
			state.rewards.push({
				id: window.crypto.randomUUID(),
				...action.payload
			});
		},
		deleteReward: (state, action) => {
			state.rewards = state.rewards.filter((reward) => reward.id !== action.payload);
		},
	},
});

export const { addReward, deleteReward } = rewardsSlice.actions;

export default rewardsSlice.reducer;
