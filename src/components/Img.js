import { useState } from 'react';
import { ImgLoader } from './Loader';

export const Img = ({ image }) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleImgLoad = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <ImgLoader />}
			<img src={image.src} alt={image.alt} onLoad={handleImgLoad} />
		</>
	);
};
