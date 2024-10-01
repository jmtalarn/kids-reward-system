import { LangType } from '../domain/Lang';

import langRepository from '../../infrastructure/repositories/lang/localStorage';

const setLang = async (lang: LangType): Promise<LangType> => {
	return langRepository.setLang(lang);
};
const getLang = async (): Promise<LangType> => {
	return langRepository.getLang();
};

export default {
	setLang,
	getLang
};
