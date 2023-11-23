import React, { memo, useMemo } from "react";
import { H1 } from "./H1";
import { useTranslation } from "../utils/useTranslation";
import { useSelector } from "react-redux";
import { selector } from "../store/funcName";
import { Trans } from "./Trans";

export const Description = memo(() => {
	const { t } = useTranslation();
	const name = useSelector(selector);
	const description = useMemo(
		() =>
			({
				Attenuation: t("Attenuation:Description"),
				Frequency: t("Frequency:Description"),
				MinDistance: t("MinDistance:Description"),
				MaxDistance: t("MaxDistance:Description"),
				DopplerFactor: t("DopplerFactor:Description"),
				Velocity: t("Velocity:Description"),
				Position: t("Position:Description"),
			}[name]),
		[t, name],
	);
	return (
		<div className="flex-1 h-full bg-myBlue-100 rounded-2xl flex flex-col">
			<H1>
				<Trans>Description</Trans>
			</H1>
			<div className="h-[50vh] overflow-auto">
				<p className="text-2xl leading-8 mb-4">{description}</p>
			</div>
		</div>
	);
});
