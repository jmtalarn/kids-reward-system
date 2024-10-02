import { PropsWithChildren } from 'react';
import { IntlProvider, type MessageFormatElement } from 'react-intl';
import messages_en from '../../i18n/compiled/en.json';
import messages_es from '../../i18n/compiled/es.json';
import messages_ca from '../../i18n/compiled/ca.json';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import type { LangType } from '../../core/domain/Lang';

const messagesMap: Record<LangType, Record<string, string> | Record<string, MessageFormatElement[]> | undefined> = {
	"en": messages_en,
	"es": messages_es,
	"ca": messages_ca
};

export const IntlProviderState = ({ children }: PropsWithChildren) => {

	const { lang } = useSelector((state: RootState) => state.settings);

	return (<IntlProvider messages={messagesMap[(lang ?? "en") as LangType]} locale={lang ?? "en"} defaultLocale="en">
		{children}
	</IntlProvider>);
};


export default IntlProviderState;
