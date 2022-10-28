import React from 'react';
import { NavLink } from 'react-router-dom';

const NestedLink = ({ to, text }) => {
	let activeStyle = {
		color: 'black',
		textDecorationStyle: 'solid',
		textDecorationLine: 'line-through',
		textDecorationColor: '#ff9900',
		textDecorationThickness: '3px',
	};

	return (
		<NavLink
			to={to}
			aria-current='page'
			className='text-font2 hover:text-neutral'
			style={({ isActive }) => (isActive ? activeStyle : undefined)}
		>
			{text}
		</NavLink>
	);
};

export default NestedLink;
