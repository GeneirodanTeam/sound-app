import React, {memo, useCallback, useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {languages} from "../../utils/i18n";

export const LangChooser = memo(() => {
    const {i18n} = useTranslation();
    
    const language = useMemo(() => i18n.language, [i18n.language]);
    const src = useMemo(() => `./assets/${language}.png`, [language]);
    const langIndex = useMemo(() => languages.indexOf(language), [language],);

    const langChange = useCallback(async () => {
        const lang = languages[+!langIndex];
        await i18n.changeLanguage(lang);
        console.log(language);
    }, [i18n, langIndex]);

    useEffect(() => {
        if (!languages.includes(language))
            langChange().then(r => r);
    }, [language, langChange]);

    return (
        <button onClick={langChange}>
            <img
                src={src}
                alt="Ukraine flag"
                className="aspect-square h-full rounded-full"
            />
        </button>
    );
});
