import React, { memo, useCallback } from "react";
import { Slider } from "./Slider";
import { getValue, selector, setValue } from "../store/properties";
import { useDispatch, useSelector } from "react-redux";

export const PropsSlider = memo(({ name }) => {
	const restProps = useSelector(selector(name));
	const dispatch = useDispatch();
	const onChange = useCallback((e) => {
		console.log(e.target.value);
		dispatch(setValue({ name, value: e.target.value }));
		dispatch(getValue(name));
	}, []);
	return <Slider name={name} onChange={onChange} {...restProps} />;
});
