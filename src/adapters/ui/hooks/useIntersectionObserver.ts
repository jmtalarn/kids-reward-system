import { useRef, useEffect, useState } from 'react';



export const useElementOnScreen = ({ initiallyVisible = false, options }: { initiallyVisible: boolean, options?: IntersectionObserverInit }) => {

	const containerRef = useRef<HTMLDivElement>(null);

	const [isVisible, setIsVisible] = useState(initiallyVisible);

	const callbackFunction = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		setIsVisible(entry.isIntersecting);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFunction, options);
		const containerRefCurrent = containerRef.current;

		if (containerRefCurrent) {
			observer.observe(containerRef.current);
		}
		return (() => {
			if (containerRefCurrent) {
				observer.unobserve(containerRefCurrent);
			}
		});
	}, [containerRef, options]);

	return { containerRef, isVisible };

};
