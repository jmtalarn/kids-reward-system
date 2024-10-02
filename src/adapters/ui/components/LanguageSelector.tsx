import { type LangType } from "../../../core/domain/Lang";
import { getLang, setLang } from "../../state/langSlice";


import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import Select from "./Select";

export const LanguageSelector = () => {
	const { lang } = useSelector((state: RootState) => state.lang);
	const intl = useIntl();
	const dispatch = useDispatch<AppDispatch>();
	//const [selectedLang, setSelectedLang] = useState<LangType>("en");

	useEffect(() => {
		dispatch(getLang());
	}, []);

	// useEffect(() => {
	// 	setSelectedLang(lang);
	// }, [lang]);


	const optionsMap = {
		"en": { value: "en", label: intl.formatMessage({ defaultMessage: "English" }) },
		"es": { value: "es", label: intl.formatMessage({ defaultMessage: "Español" }) },
		"ca": { value: "ca", label: intl.formatMessage({ defaultMessage: "Català" }) },
	};


	return (<Select
		label={intl.formatMessage({ defaultMessage: "Language" })}
		isSearchable={false}
		isClearable={false}
		value={optionsMap[lang || "en"]}
		onChange={(selectedLang) => {
			dispatch(setLang((selectedLang?.value ?? "en") as LangType));
		}}

		options={Object.values(optionsMap)}
	/>

	);
};

export default LanguageSelector;
