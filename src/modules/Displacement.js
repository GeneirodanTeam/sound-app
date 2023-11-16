import React, { useCallback, useMemo, useRef, useState } from "react";
import H1 from "./H1";
import { Slider } from "./Slider";
import { Canvas } from "./DisplacementCanvas";
import { useInterval } from "usehooks-ts";

function Displacement() {
	const freq = 20;
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [velocity, setVelocity] = useState(1);
	const ballRef = useRef(null);
	const omega = useMemo(() => velocity * Math.PI, [velocity]);
	const [alpha, setAlpha] = useState((omega * freq) / 1000);
	// const vX = useMemo(() => -omega * y, [omega, y]);
	// const vY = useMemo(() => omega * x, [omega, x]);
	const suffix = useMemo(() => (velocity != 0 ? "\u03C0" : ""), [velocity]);
	const move = useCallback(() => {
		const x = b * Math.sin(alpha);
		const y = a * Math.cos(alpha);
		ballRef.current.style.left = `${x * 29 + 142}px`;
		ballRef.current.style.bottom = `${y * 29 + 142}px`;
		setAlpha((x) => x + (omega * freq) / 1000);
	}, [omega, alpha, a, b]);
	const onChange = useCallback(
		(f) => (e) => {
			f(e.target.value);
		},
		[],
	);

	useInterval(move, freq);

	return (
		<div className="h-full min-w-fit flex flex-col bg-myBlue-100 rounded-2xl mr-16">
			<H1 title={"Displacement of the sound"} />
			<div className="grid grid-cols-10 items-center mb-4 relative">
				<input
					type="range"
					orient="vertical"
					min={-5}
					step={0.01}
					max={5}
					value={a}
					onChange={onChange(setA)}
					className="displacement w-[300px] absolute left-[-133px] top-[146px]"
				></input>
				<Canvas
					styles={"col-start-2 col-span-9 bg-myBlue-200"}
					ballRef={ballRef}
				/>
				<div className="aspect-square"></div>
				<input
					type="range"
					min={-5}
					step={0.01}
					max={5}
					value={b}
					onChange={onChange(setB)}
					className="col-span-9 displacement h-4"
				></input>
			</div>
			<Slider
				name="Velocity"
				suffix={suffix}
				min={0}
				max={2}
				step={0.01}
				value={velocity}
				onChange={onChange(setVelocity)}
			/>
		</div>
	);
}

export default Displacement;
