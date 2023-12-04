import React, { useCallback, useEffect, useRef } from "react";
import { setFileName } from "../store/audioFile";
import { useDispatch, useSelector } from "react-redux";
import { getValue, keys } from "../store/properties";
import { selector } from "../store/wavesurfer";
import { useTranslation } from "react-i18next";

export const OpenButton = () => {
	const { t } = useTranslation();
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const wavesurfer = useSelector(selector);
	const onChange = useCallback(() => {
		if (inputRef.current.files.length) {
			const file = inputRef.current.files[0];
			const audio = window.subsystem.open(file.path);
			if (window.subsystem.getWaveFormat()[0] > 1) {
				alert(
					t(
						"Your audio is in 2-channel, please choose 1-channel audio.",
					),
				);
				return;
			}
			if (audio === 0) {
				dispatch(setFileName(file.name));
				keys.map((x) => dispatch(getValue(x)));
				let reader = new FileReader();
				reader.onload = (evt) => {
					let blob = new window.Blob([
						new Uint8Array(evt.target.result),
					]);
					wavesurfer.loadBlob(blob);
				};
				reader.onerror = (evt) => {
					console.error("An error ocurred reading the file: ", evt);
				};
				reader.readAsArrayBuffer(file);
			}
		}
	}, [inputRef, dispatch, wavesurfer, t]);

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
