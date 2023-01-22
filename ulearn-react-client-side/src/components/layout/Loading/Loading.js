import React from 'react';

const Loading = ({ size }) => {
	let loadingSize = '170px';
	if (size === 'medium') {
		loadingSize = '100px';
	} else if (size === 'small') {
		loadingSize = '25px';
	}
	return (
		<lottie-player
			autoplay
			loop
			background='transparent'
			src='https://lottie.host/bc036bb5-0c9f-49f6-8d58-4bba13fafc54/p3jSw9gfoE.json'
			style={{
				width: loadingSize,
				height: loadingSize,
			}}
		/>
	);
};

export default Loading;
