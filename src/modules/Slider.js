import React, { useState } from "react";

function Slider({ name, func }) {
	const [value, setValue] = useState(0);
	function onChange(event) {
		setValue(event.target.value);
	}
	return (
		<div className="flex flex-col justify-between h-14">
			<label className="text-xl font-normal">
				{name}: {value}
			</label>
			<input
				className="cursor-pointer accent-myPurple-200 bg-transparent"
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
