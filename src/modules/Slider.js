import React, { memo } from "react";

export const Slider = memo(({ name, suffix = "", ...restProps }) => {
	const { value } = restProps;
	return (
		<div className="flex flex-col justify-between xxl:h-14 h-12 opacity-80 duration-150 hover:opacity-100 transition-opacity">
			<label className="text-xl font-normal">
				{name}: {`${value}${suffix}`}
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
