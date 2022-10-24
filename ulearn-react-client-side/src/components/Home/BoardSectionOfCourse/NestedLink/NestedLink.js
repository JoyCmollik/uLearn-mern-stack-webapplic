import React from 'react';
import { NavLink } from 'react-router-dom';

const NestedLink = ({ to, text }) => {
	return (
		<NavLink
			to={to}
			aria-current='page'
			className={({ isActive }) =>
				isActive
					? ' text-black line-through decoration-brand2 decoration-solid decoration-2 capitalize'
					: 'no-underline'
			}
		>
			{text}
		</NavLink>
	);
};

export default NestedLink;
