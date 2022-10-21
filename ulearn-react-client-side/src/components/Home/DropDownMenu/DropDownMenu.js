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
						: 'border-2 border-gray-400 rounded-md py-2 px-3 text-base  font-semibold bg-gray-400 text-white'
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
