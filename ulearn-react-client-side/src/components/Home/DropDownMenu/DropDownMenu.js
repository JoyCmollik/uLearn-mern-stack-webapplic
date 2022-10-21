import React from 'react';
import { SlArrowDown } from 'react-icons/sl';
const DropDownMenu = ({ name }) => {
	return (
		<div className='dropdown'>
			<div
				tabIndex={0}
				className={`flex items-center gap-1 ${
					name === 'pages'
						? 'border-0'
						: 'border border-gray-400 rounded-md py-2 px-6 text-base text-black  font-semibold bg-secondary '
				}`}
				aria-current='page'
			>
				{name}
				<SlArrowDown className='text-black text-sm' />
			</div>
			<ul
				tabIndex={0}
				className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm'
			>
				<li>
					<a>Item 1</a>
				</li>
				<li>
					<a>Item 2</a>
				</li>
			</ul>
		</div>
	);
};

export default DropDownMenu;
