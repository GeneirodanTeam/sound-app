import { createSlice } from "@reduxjs/toolkit";

// Slice
const { actions, name, reducer } = createSlice({
	name: "funcName",
	initialState: {
		funcName: null,
	},
	reducers: {
		setFuncName: (state, { payload }) => {
			state.funcName = payload;
		},
	},
});
export default reducer;
export const { setFuncName } = actions;
export const selector = (state) => state[name].funcName;
