import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en from '../../i18n/compiled/en.json';
import messages_es from '../../i18n/compiled/es.json';
import messages_ca from '../../i18n/compiled/ca.json';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const messagesMap = {
	"en": messages_en,
	"es": messages_es,
	"ca": messages_ca
};

export const IntlProviderState = ({ children }: PropsWithChildren) => {

	const { lang } = useSelector((state: RootState) => state.lang);

	return (<IntlProvider messages={messagesMap[lang ?? "en"]} locale={lang ?? "en"} defaultLocale="en">
		{children}
	</IntlProvider>);
};


export default IntlProviderState;
