import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ReactMarkdown from "react-markdown";
import en_markdown from './md-files/en/WTUI.md';
import es_markdown from './md-files/es/WTUI.md';
import ca_markdown from './md-files/ca/WTUI.md';
import style from './Root.module.css';
import type { LangType } from "../../../core/domain/Lang";

const filesMap: Record<LangType, string> = {
	"en": en_markdown,
	"es": es_markdown,
	"ca": ca_markdown
};

export const WhyToUseIt = () => {
	const intl = useIntl();
	const [content, setContent] = useState<string>();

	useEffect(() => {
		setContent(filesMap[intl.locale as LangType]);

	}, [intl.locale]);
	return (
		<div className={style['markdown-content']}>
			<ReactMarkdown
				// Pass it as children
				children={content}
			// components={ChakraUIRenderer()} // Skip this if you don't use ChakraUI
			// skipHtml // Skip this if you don't use ChakraUI
			/>
		</div>
	);
};

export default WhyToUseIt;
