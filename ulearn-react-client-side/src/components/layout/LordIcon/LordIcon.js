import React from 'react';

const LordIcon = ({ src, size, primary, secondary }) => {
	return (
		<lord-icon
			src={src}
			trigger='hover'
			colors={`primary:${primary ? primary : '#f79903'},secondary:${
				secondary ? secondary : '#285af4'
			}`}
			style={{ width: `${size}px`, height: `${size}px` }}
		/>
	);
};

export default LordIcon;
