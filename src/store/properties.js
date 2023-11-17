import { createSelector, createSlice } from "@reduxjs/toolkit";
const initialState = {
	Attenuation: {
		get: window.subsystem.getVolume,
		set: window.subsystem.setVolume,
		min: -100,
		max: 0,
		step: 0.01,
		value: 0,
		suffix: "dB",
	},
	Frequency: {
		get: window.subsystem.getFrequency,
		set: window.subsystem.setFrequency,
		min: 0,
		max: 100000,
		step: 10,
		value: 0,
		suffix: "Hz",
	},
	"Min distance": {
		get: window.subsystem.getMinDistance,
		set: window.subsystem.setMinDistance,
		min: 1,
		max: 10,
		step: 1,
		value: 1,
		suffix: "m",
	},
	"Max distance": {
		get: window.subsystem.getMaxDistance,
		set: window.subsystem.setMaxDistance,
		min: 1,
		max: 10,
		step: 1,
		value: 10,
		suffix: "m",
	},
	"Doppler factor": {
		get: window.subsystem.getDopplerFactor,
		set: window.subsystem.setDopplerFactor,
		min: 0,
		max: 10,
		step: 1,
		value: 1,
		suffix: "",
	},
};
const { actions, name, reducer } = createSlice({
	name: "properties",
	initialState,
	reducers: {
		setValue: (state, { payload }) => {
			let value = +payload.value;
			const substate = state[payload.name];
			if (value > substate.max) value = substate.max;
			substate.set(value);
		},
		getValue: (state, { payload }) => {
			const substate = state[payload];
			const value = substate.get();
			if (value > substate.max) substate.set(substate.max);
			substate.value = Number(substate.get().toFixed(2));
		},
	},
});
export default reducer;
export const { setValue, getValue } = actions;
const simpleSelector = (field) => (state) => state[name][field];
export const selector = (field) =>
	createSelector([simpleSelector(field)], (props) => {
		const { get, set, ...restProps } = props;
		return restProps;
	});
export const keys = Object.keys(initialState);
