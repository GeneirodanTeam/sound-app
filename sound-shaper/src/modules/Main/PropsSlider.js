import React, { memo, useCallback } from "react";
import { getValue, selector, setValue } from "../../store/properties";
import { useDispatch, useSelector } from "react-redux";
import { selector as fileNameSelector } from "../../store/audioFile";
import { useTranslation } from "react-i18next";
import { Slider } from "../Common/Slider";

export const PropsSlider = memo(({ name }) => {
	const { t } = useTranslation();
	const fileName = useSelector(fileNameSelector);
	const restProps = useSelector(selector(name));
	const dispatch = useDispatch();
	const onChange = useCallback(
		({ target: { value } }) => {
			if (fileName) {
				dispatch(setValue({ name, value }));
				dispatch(getValue(name));
			} else
				window.dialog.showErrorBox(
					t("Alert!"),
					t("You have to open file to do it!"),
				);
		},
		[dispatch, fileName, name, t],
	);
	return <Slider name={name} onChange={onChange} {...restProps} />;
});
