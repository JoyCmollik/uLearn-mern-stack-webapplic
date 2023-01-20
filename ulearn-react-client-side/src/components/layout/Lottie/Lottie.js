import React from 'react';

const Lottie = ({ src, size }) => {
	return (
		<lottie-player
			autoplay
			loop
			background='transparent'
			src={src}
			style={{
				width: `${size.width}px`,
				height: `${size.height}px`,
			}}
		/>
	);
};

export default Lottie;
