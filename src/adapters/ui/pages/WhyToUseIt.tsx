import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ReactMarkdown from "react-markdown";
// import en_markdown from './md-files/en/WTUI.md';
import style from './Root.module.css';

export const WhyToUseIt = () => {
	const intl = useIntl();
	const [content, setContent] = useState<string>();

	useEffect(() => {
		import(`./md-files/${intl.locale}/WTUI.md`)
			.then(res => {
				fetch(res.default)
					.then(res => res.text())
					.then((res: string) => setContent(res))
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});
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
