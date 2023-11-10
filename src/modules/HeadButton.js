import React from "react";

function HeadButton({ btn }) {
	let cur;
	if (btn === "plus") cur = { path: "plus.svg", styles: "h-8 w-8" };
	else if (btn === "play")
		cur = { path: "play_arrow.svg", styles: "h-12 w-12" };
	return (
		<button className="h-full aspect-square bg-myPurple-200 rounded-full flex justify-center items-center shadow-[0px_5px_0px] shadow-myPurple-400 hover:bg-myPurple-300 active:shadow-none active:translate-y-[5px]">
			<img
				className={cur.styles}
				src={"./assets/" + cur.path}
				alt={cur.path.slice(0, -3)}
			/>
		</button>
	);
}

export default HeadButton;
