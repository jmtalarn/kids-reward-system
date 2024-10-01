import { LangTypes } from '../src/core/domain/Lang';
const locales = LangTypes; //['en', 'de'];
import messages_en from '../src/i18n/compiled/en.json'
import messages_ca from '../src/i18n/compiled/ca.json'
import messages_es from '../src/i18n/compiled/es.json'

const messagesMap = {
	"en": messages_en,
	"es": messages_es,
	"ca": messages_ca
};
const messages = locales.reduce((acc, lang) => ({
	...acc,
	[lang]: messagesMap[lang], // whatever the relative path to your messages json is
}), {});

const formats = {}; // optional, if you have any formats

export const reactIntl = {
	defaultLocale: 'en',
	locales,
	messages,
	formats,
};
