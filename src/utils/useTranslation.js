import { useMemo } from "react";
import { Trans, useTranslation as useHook } from "react-i18next";

export const useTranslation = () => {
	const { t, i18n } = useHook();
	return useMemo(
		() => ({
			t: (key) => (
				<Trans
					t={t}
					i18nKey={key}
					components={[
						<span className="font-semibold" />,
						<span className="text-myOrange" />,
						<span className="text-myPurple-100" />,
						<span className="ml-10" />,
					]}
				/>
			),
			i18n,
		}),
		[i18n, t],
	);
};
