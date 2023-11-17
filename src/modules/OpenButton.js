import React, { useCallback, useEffect, useRef } from "react";
import { setFileName } from "../store/audioFile";
import { useDispatch } from "react-redux";
import { getValue, keys } from "../store/properties";

export const OpenButton = () => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const onChange = useCallback(() => {
		const file = inputRef.current.files[0];
		if (inputRef.current.files.length) {
			const audio = window.subsystem.open(file.path);
			if (audio === 0) {
				dispatch(setFileName(file.name));
				keys.map((x) => dispatch(getValue(x)));
			}
		}
	}, [inputRef, dispatch]);

	useEffect(() => {
		const input = inputRef.current;
		input.addEventListener("change", onChange);
		return () => input.removeEventListener("change", onChange);
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
