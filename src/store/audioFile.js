import { createSlice } from "@reduxjs/toolkit";

// Slice
const { actions, name, reducer } = createSlice({
	name: "audioFile",
	initialState: {
		fileName: null,
	},
	reducers: {
		setFileName: (state, { payload }) => {
			state.fileName = payload;
		},
	},
});
export default reducer;
export const { setFileName } = actions;
export const selector = (state) => state[name].fileName;
