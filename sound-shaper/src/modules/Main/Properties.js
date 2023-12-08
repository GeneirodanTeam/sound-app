import React, { memo, useCallback, useMemo } from "react";
import { H1 } from "../Common/H1";
import { keys } from "../../store/properties";
import { PropsSlider } from "./PropsSlider";
import { Trans } from "../Common/Trans";

export const Properties = memo(() => {
	const callback = useCallback(
		(prop) => <PropsSlider key={prop} name={prop} />,
		[],
	);
	const map = useMemo(() => keys.map(callback), [callback]);
	return (
		<div className="h-full xxl:w-[24rem] w-[20rem] bg-myBlue-100 rounded-2xl mr-16 flex flex-col">
			<H1>
				<Trans>Properties of the sound</Trans>
			</H1>
			<div className="flex-1 flex flex-col justify-between xxl:pb-8">
				{map}
			</div>
		</div>
	);
});
