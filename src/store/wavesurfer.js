import { createSlice } from "@reduxjs/toolkit";

// Slice
const { actions, name, reducer } = createSlice({
	name: "wavesurfer",
	initialState: {
		wavesurfer: null,
	},
	reducers: {
		setWavesurfer: (state, { payload }) => {
			state.wavesurfer = payload;
		},
	},
});
export default reducer;
export const { setWavesurfer } = actions;
export const selector = (state) => state[name].wavesurfer;
