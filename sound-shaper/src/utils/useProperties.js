import {useTranslation} from "react-i18next";
import {useMemo} from "react";

export const useProperties = () => {
    const {t} = useTranslation();
    return useMemo(
        () => (
            {
                Attenuation: t("Attenuation:Name"),
                Frequency: t("Frequency:Name"),
                MinDistance: t("MinDistance:Name"),
                MaxDistance: t("MaxDistance:Name"),
                DopplerFactor: t("DopplerFactor:Name"),
                Velocity: t("Velocity:Name"),
            }
        ),
        [t],
    );
};