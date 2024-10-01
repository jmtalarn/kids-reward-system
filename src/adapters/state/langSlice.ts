import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LangType } from "../../core/domain/Lang";
import langService from '../../core/services/LangService';

type StateType = {
	lang: LangType | null
}
const initialState: StateType = {
	lang: null,
};

export const getLang = createAsyncThunk('lang/get', async () => {
	const langSetted = await langService.getLang();
	return langSetted;
});
export const setLang = createAsyncThunk('lang/set', async (lang: LangType) => {
	const langSetted = await langService.setLang(lang);
	return langSetted;
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
			});
	},
});


export default langSlice.reducer;
