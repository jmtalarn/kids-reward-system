import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	assessments: [],
};

const assessmentsSlice = createSlice({
	name: "assessments",
	initialState,
	reducers: {
		addAssessment: (state, action) => {
			state.assessments.push({
				id: window.crypto.randomUUID(),
				...action.payload
			});
		},
		deleteAssessment: (state, action) => {
			state.assessments = state.assessments.filter((assessment) => assessment.id !== action.payload);
		},
	},
});

export const { addReward, deleteReward } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
