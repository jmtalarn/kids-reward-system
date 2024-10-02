import { LangType } from '../domain/Lang';
import type { DayOfWeek, Percentage } from '../domain/Settings';
import settingsRepository from '../../infrastructure/repositories/settings/localStorage';


const setLang = async (lang: LangType): Promise<LangType> => {
	return settingsRepository.setLang(lang);
};
const getLang = async (): Promise<LangType> => {
	return settingsRepository.getLang();
};

const setFirstDayOfWeek = async (dayOfWeek: DayOfWeek): Promise<DayOfWeek> => {
	return settingsRepository.setFirstDayOfWeek(dayOfWeek);
};
const getFirstDayOfWeek = async (): Promise<DayOfWeek> => {
	return settingsRepository.getFirstDayOfWeek();
};

const setClaimingConfirmationThreshold = async (threshold: Percentage): Promise<Percentage> => {
	return settingsRepository.setClaimingConfirmationThreshold(threshold);
};
const getClaimingConfirmationThreshold = async (): Promise<Percentage> => {
	return settingsRepository.getClaimingConfirmationThreshold();
};

export default {
	setLang,
	getLang,
	setFirstDayOfWeek,
	getFirstDayOfWeek,
	setClaimingConfirmationThreshold,
	getClaimingConfirmationThreshold
};
