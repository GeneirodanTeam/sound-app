import { memo } from "react";
import { Trans as T, useTranslation } from "react-i18next";

export const Trans = memo(({ children }) => {
	const { t } = useTranslation();
	return <T t={t}>{children}</T>;
});
