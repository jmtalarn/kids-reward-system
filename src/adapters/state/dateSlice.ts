import { createSlice } from "@reduxjs/toolkit";
import { dateToShortISOString } from "../../core/domain/utils/date-utils";
const initialState = {
	date: dateToShortISOString(),
};

const dateSlice = createSlice({
	name: "date",
	initialState,
	reducers: {
		setNewDate: (state, action) => { state.date = dateToShortISOString(new Date(action.payload)); },
		setToday: (state) => { state.date = dateToShortISOString(); },
		forwardDays: (state, action) => {
			const settedDate = new Date(state.date);
			settedDate.setDate(settedDate.getDate() + action.payload);
			state.date = dateToShortISOString(settedDate);
		},
		backwardDays: (state, action) => {
			const settedDate = new Date(state.date);
			settedDate.setDate(settedDate.getDate() - action.payload);
			state.date = dateToShortISOString(settedDate);
		},
		forwardMonth: () => {
			const settedDate = new Date(state.date);
			settedDate.setMonth(settedDate.getMonth() + 1);
			state.date = dateToShortISOString(settedDate);
		},
		backwardMonth: () => {
			const settedDate = new Date(state.date);
			settedDate.setMonth(settedDate.getMonth() - 1);
			state.date = dateToShortISOString(settedDate);
		},
	},
});

export const { setNewDate, setToday, forwardDays, backwardDays, forwardMonth, backwardMonth } = dateSlice.actions;

export default dateSlice.reducer;
