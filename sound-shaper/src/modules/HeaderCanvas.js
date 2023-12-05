import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selector } from "../store/audioFile";
import WaveSurfer from "wavesurfer.js";
import { setWavesurfer } from "../store/wavesurfer";

export const HeaderCanvas = ({ styles }) => {
	const fileName = useSelector(selector);
	const containerRef = useRef();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!containerRef.current) return;
		const ws = WaveSurfer.create({
			waveColor: "#FDB45E",
			progressColor: "#FDB45E",
			container: containerRef.current,
			height: "auto",
			cursorWidth: 0,
		});
		dispatch(setWavesurfer(ws));
		return () => ws.destroy();
	}, [containerRef, fileName, dispatch]);
	return <div ref={containerRef} className={styles + " "} />;
};
