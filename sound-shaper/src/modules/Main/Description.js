import React, {memo} from "react";
import {Trans} from "../Common/Trans";
import {H1} from "../Common/H1";
import {useDescription} from "../../utils/useDescription";

export const Description = memo(() => {
	const description = useDescription();
	return (
		<div className="flex-1 min-w-[26rem] h-full bg-myBlue-100 rounded-2xl flex flex-col">
			<H1>
				<Trans>Description</Trans>
			</H1>
			<div className="h-[50vh] overflow-auto">
				<p className="text-xl leading-8 mb-4">{description}</p>
			</div>
		</div>
	);
});
