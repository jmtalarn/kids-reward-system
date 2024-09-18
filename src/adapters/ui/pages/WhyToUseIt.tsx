import ReactMarkdown from "react-markdown";
import markdown from './md-files/WTUI.md';
import style from './Root.module.css';
export const WhyToUseIt = () => (
	<div className={style['markdown-content']}>
		<ReactMarkdown
			// Pass it as children
			children={markdown}
		// components={ChakraUIRenderer()} // Skip this if you don't use ChakraUI
		// skipHtml // Skip this if you don't use ChakraUI
		/>
	</div>
);

export default WhyToUseIt;
