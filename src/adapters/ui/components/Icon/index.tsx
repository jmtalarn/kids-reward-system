import { Suspense, lazy } from 'react';

const Icon = ({ icon, style, className }) => {
	const LazyIcon = lazy(() => {

		return icon ? import(`./icons/${icon}.svg?react`).catch(() => ({ default: () => null })) : null;

	});

	return (
		<Suspense>
			{icon
				&&
				<LazyIcon
					style={style}
					className={className}
				/>
			}
		</Suspense>
	);
};

export default Icon; 
