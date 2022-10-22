import React from 'react'

const LordIcon = ({src, size}) => {
  return (
		<lord-icon
			src={src}
			trigger='hover'
			colors='primary:#f79903,secondary:#285af4'
			style={{ width: `${size}px`, height: `${size}px` }}
		/>
  );
}

export default LordIcon;