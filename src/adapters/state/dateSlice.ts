import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	date: new Date().toISOString(),
};

const dateSlice = createSlice({
	name: "date",
	initialState,
	reducers: {
		setNewDate: (state, action) => { state.date = action.payload.toISOString(); },
		setToday: (state) => { state.date = new Date().toISOString(); },
		forwardDays: (state, action) => {
			const settedDate = new Date(state.date.toISOString())
			settedDate.setDate(settedDate.getDate() + action.payload);
			state.date = settedDate.toISOString();
		},
		backwardDays: (state, action) => {
			const settedDate = new Date(state.date.toISOString())
			settedDate.setDate(settedDate.getDate() - action.payload);
			state.date = settedDate.toISOString();
		},
		forwardMonth: () => {
			const settedDate = new Date(state.date.toISOString())
			settedDate.setMonth(settedDate.getMonth() + 1);
			state.date = settedDate.toISOString();
		},
		backwardMonth: () => {
			const settedDate = new Date(state.date.toISOString())
			settedDate.setMonth(settedDate.getMonth() - 1);
			state.date = settedDate.toISOString();
		},
	},
});

export const { setNewDate, setToday, forwardDays, backwardDays, forwardMonth, backwardMonth } = dateSlice.actions;

export default dateSlice.reducer;
