import React, { useCallback, useEffect, useRef } from "react";

export const OpenButton = ({ setFileName }) => {
	const inputRef = useRef(null);
	const onChange = useCallback(() => {
		const file = inputRef.current.files[0];
		if (inputRef.current.files.length) {
			setFileName(file.name);
			console.log((window.subsystem.open(file.path) >>> 0).toString(16));
		}
	}, [inputRef]);

	useEffect(() => {
		inputRef.current.addEventListener("change", onChange);
		return inputRef.current.removeEventListener("change", onChange);
	}, [inputRef, onChange]);

	return (
		<label className="relative h-full aspect-square bg-myPurple-200 rounded-full flex justify-center items-center shadow-[0px_5px_0px] shadow-myPurple-400 hover:bg-myPurple-300 active:shadow-none active:translate-y-[5px] duration-150  cursor-pointer">
			<img className={"h-8 w-8"} src={"./assets/plus.svg"} alt={"plus"} />
			<input
				ref={inputRef}
				type="file"
				accept="audio/wav"
				className="absolute w-full h-full invisible"
				onChange={onChange}
			></input>
		</label>
	);
};
