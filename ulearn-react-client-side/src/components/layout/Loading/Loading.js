import React from 'react';

const Loading = ({ size }) => {
	return (
		<lottie-player
			autoplay
			loop
			background='transparent'
			src='https://lottie.host/bc036bb5-0c9f-49f6-8d58-4bba13fafc54/p3jSw9gfoE.json'
			style={{
				width: `${size === 'small' ? '25px' : '170px'}`,
				height: `${size === 'small' ? '25px' : '170px'}`,
			}}
		/>
	);
};

export default Loading;
