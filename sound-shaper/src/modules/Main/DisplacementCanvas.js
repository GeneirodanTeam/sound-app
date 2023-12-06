import React, {memo, useCallback, useEffect, useRef} from "react";

export const Canvas = memo(({styles, ballRef}) => {
    const canvasRef = useRef(null);

    const draw = useCallback((ctx) => {
        ctx.strokeStyle = "#7B146B";
        ctx.beginPath();
        for (let i = 1; i < 11; i++) {
            const a = (i === 10) ? 20 : 0;
            ctx.moveTo(i * 30 + a, 0);
            ctx.lineTo(i * 30 + a, 300);
            ctx.moveTo(0, 30 * i + a);
            ctx.lineTo(300, 30 * i + a);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = "#A72693";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 300);
        ctx.moveTo(0, 150);
        ctx.lineTo(300, 150);
        ctx.closePath();
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;

        draw(ctx);
    }, [draw]);

    return (
        <div className={styles + " relative"}>
            <canvas ref={canvasRef} width={300} height={300}></canvas>
            <div
                className="absolute top-[142px] left-[142px] bg-myPurple-200 h-[16px] w-[16px] rounded-full"
                style={{boxShadow: "0px 0px 4px 1px #4D1544 inset"}}
            ></div>
            <div
                ref={ballRef}
                className="absolute bg-myYellow h-[16px] w-[16px] rounded-full bottom-[142px] left-[142px]"
                style={{boxShadow: "0px 0px 4px 1px #75734D inset"}}
            ></div>
        </div>
    );
});
