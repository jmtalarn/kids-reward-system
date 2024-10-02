import { type LangType } from "../../../core/domain/Lang";
import { getLang, setLang } from "../../state/settingsSlice";


import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import Select from "./Select";

export const LanguageSelector = () => {
	const { lang } = useSelector((state: RootState) => state.settings);
	const intl = useIntl();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getLang());
	}, []);

	const optionsMap: Record<LangType, { value: LangType, label: string }> = {
		"en": { value: "en", label: intl.formatMessage({ defaultMessage: "English" }) },
		"es": { value: "es", label: intl.formatMessage({ defaultMessage: "Español" }) },
		"ca": { value: "ca", label: intl.formatMessage({ defaultMessage: "Català" }) },
	};

	return (<Select
		label={intl.formatMessage({ defaultMessage: "Language" })}
		isSearchable={false}
		isClearable={false}
		value={optionsMap[(lang || "en") as LangType]}
		onChange={(selectedLang) => {
			dispatch(setLang((selectedLang?.value ?? "en") as LangType));
		}}

		options={Object.values(optionsMap)}
	/>

	);
};

export default LanguageSelector;
