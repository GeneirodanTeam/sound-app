import React, { useEffect, useState } from "react";
import { HeaderCanvas } from "./HeaderCanvas";
import { PlayButton } from "./PlayButton";
import { OpenButton } from "./OpenButton";

// function convertRemToPixels(rem) {
// 	return (
// 		rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
// 	);
// }

function Header() {
	//const [canvasWidth, setCanvasWidth] = useState(500);

	// useEffect(() => {
	// 	const updSize = () => {
	// 		let a = window.innerWidth - convertRemToPixels(22);
	// 		if (a < 500) setCanvasWidth(500);
	// 		else setCanvasWidth(a);
	// 	};
	// 	window.addEventListener("resize", updSize);
	// 	updSize();
	// 	return () => window.removeEventListener("resize", updSize);
	// }, []);

	return (
		<header className="w-full min-h-[7rem] pt-8 flex">
			<div className="min-w-[12rem] h-full flex justify-between mr-8">
				<OpenButton />
				<PlayButton />
			</div>
			<div className="h-full flex-1 relative">
				<span className="text-2xl absolute top-[-2.2rem] pl-2 font-semibold">
					Name of file.wav
				</span>
				<HeaderCanvas
					styles={"h-full w-full bg-myBlue-100 rounded-2xl"}
				/>
			</div>
		</header>
	);
}

export default Header;
