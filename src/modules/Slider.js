import React, { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setFuncName } from "../store/funcName";
import { useTranslation } from "react-i18next";

export const Slider = memo(({ name, suffix = "", ...restProps }) => {
	const { t } = useTranslation();
	const { value } = restProps;
	const dispatch = useDispatch();
	const humanName = useMemo(
		() =>
			({
				Attenuation: t("Attenuation:Name"),
				Frequency: t("Frequency:Name"),
				MinDistance: t("MinDistance:Name"),
				MaxDistance: t("MaxDistance:Name"),
				DopplerFactor: t("DopplerFactor:Name"),
				Velocity: t("Velocity:Name"),
			}[name]),
		[t, name],
	);
	const onMouseEnter = useCallback(() => {
		dispatch(setFuncName(name));
	}, [dispatch, name]);
	return (
		<div
			onMouseEnter={onMouseEnter}
			className="flex flex-col justify-between xxl:h-14 h-12 opacity-80 duration-150 hover:opacity-100 transition-opacity"
		>
			<label className="text-xl font-normal whitespace-nowrap">
				{humanName}: {` ${value} ${suffix}`}
			</label>
			<input
				className="range"
				type="range"
				min={0}
				max={100}
				{...restProps}
			/>
		</div>
	);
});
