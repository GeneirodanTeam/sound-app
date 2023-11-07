import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/titlebar.css";
import LangChooser from "./moduls/LangChooser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<div className="flex flex-col w-full h-[100vh] px-16 py-8 bg-myBlue-200 text-myYellow">
			<header className="w-full h-32 pt-8 flex">
				<div className="w-56 h-full flex justify-between">
					<button className="aspect-square bg-myPurple-200 rounded-full flex justify-center items-center cursor-pointer shadow-[0px_5px_0px] shadow-myPurple-400 active:shadow-none active:translate-y-[5px] duration-150">
						<img
							className="h-10 w-10"
							src="./assets/plus.svg"
							alt="plus"
						/>
					</button>
					<button className="aspect-square bg-myPurple-200 rounded-full flex justify-center items-center cursor-pointer shadow-[0px_5px_0px] shadow-myPurple-400 active:shadow-none active:translate-y-[5px] duration-150">
						<img
							className="h-16 w-16"
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
			<main className="w-full flex-1">body</main>
			<footer className="w-full h-12 flex justify-end">
				<LangChooser />
			</footer>
		</div>
	</React.StrictMode>,
);
