import React from 'react';

const Loading = ({ size }) => {
	let loadingSize = '170px';
	if (size === 'medium') {
		loadingSize = '70px';
	} else if (size === 'small') {
		loadingSize = '25px';
	}
	return (
		<lottie-player
			autoplay
			loop
			background='transparent'
			src='https://assets4.lottiefiles.com/packages/lf20_rV2u164IHk.json'
			style={{
				width: loadingSize,
				height: loadingSize,
			}}
		/>
	);
};

export default Loading;
