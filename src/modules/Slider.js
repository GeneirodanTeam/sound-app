import React, { useState } from "react";

function Slider({ name, func }) {
	const [value, setValue] = useState(0);
	function onChange(event) {
		setValue(event.target.value);
	}
	return (
		<div className="flex flex-col justify-between xxl:h-14 h-12 opacity-70 duration-150 hover:opacity-100">
			<label className="text-xl font-normal">
				{name}: {value}
			</label>
			<input
				className="w-full"
				type="range"
				min={0}
				max={100}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default Slider;
