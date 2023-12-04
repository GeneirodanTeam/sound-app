import React, { memo, useCallback } from "react";
import { Slider } from "./Slider";
import { getValue, selector, setValue } from "../store/properties";
import { useDispatch, useSelector } from "react-redux";
import { selector as fileNameSelector } from "../store/audioFile";
import { useTranslation } from "react-i18next";

export const PropsSlider = memo(({ name }) => {
	const { t } = useTranslation();
	const fileName = useSelector(fileNameSelector);
	const restProps = useSelector(selector(name));
	const dispatch = useDispatch();
	const onChange = useCallback(
		(e) => {
			if (fileName) {
				console.log(e.target.value);
				dispatch(setValue({ name, value: e.target.value }));
				dispatch(getValue(name));
			} else alert(t("You have to open file to do it!"));
		},
		[dispatch, fileName, name, t],
	);
	return <Slider name={name} onChange={onChange} {...restProps} />;
});
