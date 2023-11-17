import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../utils/i18n";

function LangChooser() {
	const [langIndex, setLangIndex] = useState(0);
	const { i18n } = useTranslation();

	const langChange = useCallback(async () => {
		const lang = languages[+!langIndex];
		await i18n.changeLanguage(lang);
		setLangIndex((x) => +!x);
		console.log(i18n.language);
	}, [i18n, langIndex]);

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
