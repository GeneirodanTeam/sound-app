import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import resourcesToBackend from 'i18next-resources-to-backend';

export const languages = ["en", "uk"];
i18n.use(resourcesToBackend((language, namespace) => import(`../locales/${language}/${namespace}.json`)))
    .use(initReactI18next)
    .init({
        ns: [
            "Translation",
            "Attenuation",
            "Frequency",
            "MinDistance",
            "MaxDistance",
            "DopplerFactor",
            "Velocity",
            "Position",
        ],
        initImmediate: false,
        //debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    })
    .then();
