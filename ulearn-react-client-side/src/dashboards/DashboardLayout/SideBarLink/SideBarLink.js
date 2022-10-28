import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarLink = React.forwardRef(
	({ ...props }, ref) => {
		return (
			<NavLink
				ref={ref}
				{...props}
				className={({ isActive }) =>
					[
						props.className,
<<<<<<< HEAD
						'px-4 py-2 rounded-lg flex items-center space-x-2 text-base hover:bg-light hover:text-font1',
						isActive
							? ' text-primary border-l-[4px] border-primary bg-gradient-to-r from-light to-transparent'
							: 'text-font1',
=======
						'px-4 py-2 rounded-lg flex items-center space-x-2 text-font1 text-base hover:bg-light hover:text-font1',
						isActive
							? 'bg-light text-primary'
							: null,
>>>>>>> dev-shahida
					]
						.filter(Boolean)
						.join(' ')
				}
			/>
		);
	}
);

export default SideBarLink