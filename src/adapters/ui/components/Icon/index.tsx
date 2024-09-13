import { Suspense, lazy } from 'react';

const Icon = ({ icon, style, className, ...props }) => {
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
					{...props}
				/>
			}
		</Suspense>
	);
};

export default Icon; 
