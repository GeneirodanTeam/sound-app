import React from "react";

function Header() {
	return (
		<header className="w-full h-28 pt-8 flex">
			<div className="w-48 h-full flex justify-between">
				<button className="aspect-square bg-myPurple-200 rounded-full flex justify-center items-center cursor-pointer shadow-[0px_5px_0px] shadow-myPurple-400 active:shadow-none active:translate-y-[5px] duration-150">
					<img
						className="h-8 w-8"
						src="./assets/plus.svg"
						alt="plus"
					/>
				</button>
				<button className="aspect-square bg-myPurple-200 rounded-full flex justify-center items-center cursor-pointer shadow-[0px_5px_0px] shadow-myPurple-400 active:shadow-none active:translate-y-[5px] duration-150">
					<img
						className="h-12 w-12"
						src="./assets/play_arrow.svg"
						alt="plus"
					/>
				</button>
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
