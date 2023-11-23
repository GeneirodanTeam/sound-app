import React, { memo } from "react";
import { H1 } from "./H1";
import { keys } from "../store/properties";
import { PropsSlider } from "./PropsSlider";
import { Trans } from "./Trans";

export const Properties = memo(() => (
	<div className="h-full xxl:w-[28rem] w-[22rem] bg-myBlue-100 rounded-2xl mr-16 flex flex-col">
		<H1>
			<Trans>Properties of the sound</Trans>
		</H1>
		<div className="flex-1 flex flex-col justify-between xxl:pb-8">
			{keys.map((prop) => (
				<PropsSlider key={prop} name={prop} />
			))}
		</div>
	</div>
));
