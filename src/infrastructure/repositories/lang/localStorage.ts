import { LangTypes, type LangType } from "../../../core/domain/Lang";



const LOCAL_STORAGE_KEY = 'KRS_LANG';

const setLang = async (lang: LangType): Promise<LangType> => {
	localStorage.setItem(LOCAL_STORAGE_KEY, lang);
	return lang;
};

const getLang = async (): Promise<LangType> => {
	const lang = localStorage.getItem(LOCAL_STORAGE_KEY);
	const navigatorLanguages = navigator.languages.map(l => l.split("-")[0]);

	return (lang ?? (navigatorLanguages.find(lang => LangTypes.includes(lang as LangType)))) as LangType;
};

export default {
	setLang,
	getLang
};
