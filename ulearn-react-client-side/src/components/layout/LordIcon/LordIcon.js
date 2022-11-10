import React from 'react';

const LordIcon = ({ src, size, primary, secondary }) => {
	return (
		<lord-icon
			src={src}
			trigger='hover'
			colors={`primary:${primary ? primary : '#1F53F3'},secondary:${
				secondary ? secondary : '#303345'
			}`}
			style={{ width: `${size}px`, height: `${size}px` }}
		/>
	);
};

export default LordIcon;
