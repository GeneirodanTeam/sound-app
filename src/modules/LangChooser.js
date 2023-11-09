import React, { useState } from "react";

function LangChooser() {
	const [lang, setLang] = useState("ua");

	const langChange = () => {
		if (lang === "ua") setLang("uk");
		else setLang("ua");
	};

	return (
		<button onClick={langChange}>
			<img
				src={`./assets/${lang}.png`}
				alt="Ukraine flag"
				className="aspect-square h-full rounded-full"
			/>
		</button>
	);
}

export default LangChooser;
