import React from "react";
import { Slider } from "./Slider";
import H1 from "./H1";

function Properties() {
	const funcs = [
		{ name: "First", func: () => console.log(1) },
		{ name: "Second", func: () => console.log(2) },
		{ name: "Third", func: () => console.log(3) },
		{ name: "Fourth", func: () => console.log(4) },
		{ name: "Fifth", func: () => console.log(5) },
		{ name: "Sixth", func: () => console.log(6) },
	];

	return (
		<div className="h-full xxl:w-[28rem] w-[22rem] bg-myBlue-100 rounded-2xl mr-16 flex flex-col">
			<H1 title={"Properties of the sound"} />
			<div className="flex-1 flex flex-col justify-between xxl:pb-8">
				{funcs.map((func) => {
					return (
						<Slider
							key={func.name}
							name={func.name}
							onChange={func.func}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Properties;
