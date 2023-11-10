import React from "react";
import HeadButton from "./HeadButton";

function Header() {
	return (
		<header className="w-full min-h-[7rem] pt-8 flex">
			<div className="w-48 h-full flex justify-between">
				<HeadButton btn={"plus"} />
				<HeadButton btn={"play"} />
			</div>
			<div className="h-full flex-1 ml-8 relative">
				<span className="text-2xl absolute top-[-2.2rem] pl-2 font-semibold">
					Name of file.wav
				</span>
				<div className="h-full w-full bg-myBlue-100 rounded-2xl"></div>
			</div>
		</header>
	);
}

export default Header;
