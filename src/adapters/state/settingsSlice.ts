import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LangType } from "../../core/domain/Lang";
import { type DayOfWeek, type Percentage, type SettingsType } from "../../core/domain/Settings";
import settingsService from '../../core/services/SettingsService';


type StateType = SettingsType;

const initialState: StateType = {
	lang: null,
	firstDayOfWeek: 0,
	claimingConfirmationThreshold: 0
};

export const getLang = createAsyncThunk('lang/get', async () => {
	const langSetted = await settingsService.getLang();
	return langSetted;
});

export const setLang = createAsyncThunk('lang/set', async (lang: LangType) => {
	const langSetted = await settingsService.setLang(lang);
	return langSetted;
});

export const getFirstDayOfWeek = createAsyncThunk('firstDayOfWeek/get', async () => {
	const firstDayOfWeekSetted = await settingsService.getFirstDayOfWeek();
	return firstDayOfWeekSetted;
});

export const setFirstDayOfWeek = createAsyncThunk('firstDayOfWeek/set', async (firstDayOfWeek: DayOfWeek) => {
	const firstDayOfWeekSetted = await settingsService.setFirstDayOfWeek(firstDayOfWeek);
	return firstDayOfWeekSetted;
});

export const getClaimingConfirmationThreshold = createAsyncThunk('claimingConfirmationThreshold/get', async () => {
	const claimingConfirmationThresholdSetted = await settingsService.getClaimingConfirmationThreshold();
	return claimingConfirmationThresholdSetted;
});

export const setClaimingConfirmationThreshold = createAsyncThunk('claimingConfirmationThreshold/set', async (claimingConfirmationThreshold: Percentage) => {
	const claimingConfirmationThresholdSetted = await settingsService.setClaimingConfirmationThreshold(claimingConfirmationThreshold);
	return claimingConfirmationThresholdSetted;
});


const langSlice = createSlice({
	name: "lang",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(setLang.fulfilled, (state, action) => {
				state.lang = action.payload;
			})
			.addCase(getLang.fulfilled, (state, action) => {
				state.lang = action.payload;
			})
			.addCase(setFirstDayOfWeek.fulfilled, (state, action) => {
				state.firstDayOfWeek = action.payload;
			})
			.addCase(getFirstDayOfWeek.fulfilled, (state, action) => {
				state.firstDayOfWeek = action.payload;
			})
			.addCase(setClaimingConfirmationThreshold.fulfilled, (state, action) => {
				state.claimingConfirmationThreshold = action.payload;
			})
			.addCase(getClaimingConfirmationThreshold.fulfilled, (state, action) => {
				state.claimingConfirmationThreshold = action.payload;
			});
	},
});


export default langSlice.reducer;
