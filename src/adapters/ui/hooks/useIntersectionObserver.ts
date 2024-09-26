import { useRef, useEffect, useState } from 'react';



export const useElementOnScreen = ({ initiallyVisible = false, options }: { initiallyVisible: boolean, options?: IntersectionObserverInit }) => {

	const containerRef = useRef<IntersectionObserver | null>(null);

	const [isVisible, setIsVisible] = useState(initiallyVisible);

	const callbackFunction = (entries) => {
		const [entry] = entries;
		setIsVisible(entry.isIntersecting);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFunction, options);
		if (containerRef.current) {
			observer.observe(containerRef.current);
		}
		return (() => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		});
	}, [containerRef, options]);

	return [containerRef, isVisible];

};
