import React, { memo } from "react";
import { useProperties } from "../../utils/useProperties";
import { useTimerHover } from "../../utils/useTimerHover";

export const Slider = memo(({ name, suffix = "", ...restProps }) => {
	const { value } = restProps;
	const properties = useProperties();
	const { onMouseEnter, onMouseLeave } = useTimerHover(name);
	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className="flex flex-col justify-between xxl:h-14 h-12 opacity-[0.85] duration-150 hover:opacity-100 transition-opacity"
		>
			<label className="text-xl font-normal whitespace-nowrap">
				{properties[name]}: {` ${value} ${suffix}`}
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
