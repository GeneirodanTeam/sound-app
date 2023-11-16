import React, { useCallback, useEffect, useRef } from "react";

export const HeaderCanvas = ({ styles }) => {
	const canvasRef = useRef(null);
	//console.log(width);
	const draw = useCallback((ctx) => {}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.canvas.width = 300;
		ctx.canvas.height = 150;

		draw(ctx);
	}, [draw]);
	return <canvas ref={canvasRef} className={styles + " "}></canvas>;
};
