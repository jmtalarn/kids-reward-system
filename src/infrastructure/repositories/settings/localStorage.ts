import { LangTypes, type LangType } from "../../../core/domain/Lang";
import type { DayOfWeek, Percentage, SettingsType } from "../../../core/domain/Settings";



const LOCAL_STORAGE_KEY = 'KRS_SETTINGS';

const getSettings = async (): Promise<SettingsType> => {
	const settings = localStorage.getItem(LOCAL_STORAGE_KEY);
	return settings ? JSON.parse(settings) : {};
};

const setLang = async (lang: LangType): Promise<LangType> => {
	const settings = await getSettings();
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...settings, lang }));
	return lang;
};

const getLang = async (): Promise<LangType> => {
	const { lang } = await getSettings();
	const navigatorLanguages = navigator.languages.map(l => l.split("-")[0]);

	return (lang ?? (navigatorLanguages.find(lang => LangTypes.includes(lang as LangType)))) as LangType;
};

const setFirstDayOfWeek = async (dayOfWeek: DayOfWeek): Promise<DayOfWeek> => {
	const settings = await getSettings();
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...settings, firstDayOfWeek: dayOfWeek }));
	return dayOfWeek;
};

const getFirstDayOfWeek = async (): Promise<DayOfWeek> => {
	const { firstDayOfWeek } = await getSettings();
	return (firstDayOfWeek);
};

const setClaimingConfirmationThreshold = async (threshold: Percentage): Promise<Percentage> => {
	const settings = await getSettings();
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...settings, claimingConfirmationThreshold: threshold }));
	return threshold;
};

const getClaimingConfirmationThreshold = async (): Promise<Percentage> => {
	const { claimingConfirmationThreshold } = await getSettings();
	return (claimingConfirmationThreshold);
};

export default {
	setLang,
	getLang,
	setFirstDayOfWeek,
	getFirstDayOfWeek,
	setClaimingConfirmationThreshold,
	getClaimingConfirmationThreshold
};
