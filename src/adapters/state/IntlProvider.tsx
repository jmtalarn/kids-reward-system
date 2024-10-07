import { PropsWithChildren, useEffect } from 'react';
import { IntlProvider, type MessageFormatElement } from 'react-intl';
import messages_en from '../../i18n/compiled/en.json';
import messages_es from '../../i18n/compiled/es.json';
import messages_ca from '../../i18n/compiled/ca.json';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import type { LangType } from '../../core/domain/Lang';
import { getLang } from './settingsSlice';

const messagesMap: Record<LangType, Record<string, string> | Record<string, MessageFormatElement[]> | undefined> = {
	"en": messages_en,
	"es": messages_es,
	"ca": messages_ca
};

export const IntlProviderState = ({ children }: PropsWithChildren) => {

	const { lang } = useSelector((state: RootState) => state.settings);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getLang());
	}, []);
	return (<IntlProvider messages={messagesMap[(lang ?? "en") as LangType]} locale={lang ?? "en"} defaultLocale="en">
		{children}
	</IntlProvider>);
};


export default IntlProviderState;
