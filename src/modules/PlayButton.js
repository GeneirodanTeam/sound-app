import React, { useCallback, useMemo, useState } from "react";

export const PlayButton = () => {
	const [play, setPlay] = useState(false);
	const src = useMemo(
		() => (play ? "./assets/pause.svg" : "./assets/play_arrow.svg"),
		[play],
	);
	const onClick = useCallback(() => {
		if (play) console.log(window.subsystem.stop());
		else console.log(window.subsystem.play());
		setPlay(!play);
	}, [play]);
	return (
		<button
			onClick={onClick}
			className="h-full aspect-square bg-myPurple-200 rounded-full flex justify-center items-center shadow-[0px_5px_0px] shadow-myPurple-400 hover:bg-myPurple-300 active:shadow-none active:translate-y-[5px]"
		>
			<img className={"h-12 w-12"} src={src} alt={"play_arrow"} />
		</button>
	);
};
