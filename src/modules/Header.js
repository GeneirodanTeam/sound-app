import React from "react";
import { HeaderCanvas } from "./HeaderCanvas";
import { PlayButton } from "./PlayButton";
import { OpenButton } from "./OpenButton";
import { useSelector } from "react-redux";
import { selector } from "../store/audioFile";

function Header() {
	const fileName = useSelector(selector);

	return (
		<header className="w-full min-h-[7rem] pt-8 flex">
			<div className="min-w-[12rem] h-full flex justify-between mr-8">
				<OpenButton />
				<PlayButton />
			</div>
			<div className="h-full flex-1 relative">
				<span className="text-2xl absolute top-[-2.2rem] pl-2 font-semibold">
					{fileName}
				</span>
				<HeaderCanvas
					styles={"h-full w-full bg-myBlue-100 rounded-2xl"}
				/>
			</div>
		</header>
	);
}

export default Header;
