import {useSelector} from "react-redux";
import {selector} from "../store/funcName";
import {useMemo} from "react";
import {useTranslation} from "./useTranslation";

export const useDescription = () => {
    const {t} = useTranslation();
    const name = useSelector(selector);
    return useMemo(
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
};