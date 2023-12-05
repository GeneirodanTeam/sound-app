import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../utils/i18n";

function LangChooser() {
	const { i18n } = useTranslation();
	const langIndex = useMemo(
		() => languages.indexOf(i18n.language),
		[i18n.language],
	);

	const langChange = useCallback(async () => {
		const lang = languages[+!langIndex];
		await i18n.changeLanguage(lang);
		console.log(i18n.language);
	}, [i18n, langIndex]);

	useEffect(() => {
		if (!languages.includes(i18n.language)) langChange();
	}, [i18n.language, langChange]);

	return (
		<button onClick={langChange}>
			<img
				src={`./assets/${i18n.language}.png`}
				alt="Ukraine flag"
				className="aspect-square h-full rounded-full"
			/>
		</button>
	);
}

export default LangChooser;
