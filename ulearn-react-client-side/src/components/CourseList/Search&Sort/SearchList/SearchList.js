import React from 'react';
import SortDropDown from '../SortDropDown/SortDropDown';
import { Menu } from 'antd';
const searchlist = [
	{ id: 71, to: '/development', text: 'Development' },
	{ id: 72, to: '/business', text: 'Business' },
	{ id: 73, to: '/software', text: 'Software' },
	{ id: 74, to: '/Design', text: 'Design' },
];

const menu = (
	<Menu
		items={[
			{
				label: <a href='https://www.antgroup.com'>1st menu item</a>,
				key: '0',
			},
			{
				label: <a href='https://www.aliyun.com'>2nd menu item</a>,
				key: '1',
			},
			{
				type: 'divider',
			},
			{
				label: '3rd menu item',
				key: '3',
			},
		]}
	/>
);

const SearchList = () => {
	return (
		<section className='min-h-[24vh] '>
			<div className='container mx-auto'>
				<div className='flex flex-row items-center pt-24 justify-between'>
					{/*------------------people also search by------------------------*/}
					<article className='flex flex-row items-center '>
						<h4 className='capitalize text-[#090979] text-sm   mb-3'>
							people also search by:
						</h4>
						{/*--------------------------search list --------------------------------*/}
						<ul className='flex flex-row items-center space-x-2 '>
							{searchlist.map((list) => (
								<li
									key={list.id}
									className='bg-[#ede4f1] px-[15px] py-[4px] rounded-2xl text-[#090979] font-medium '
								>
									{list.text}
								</li>
							))}
						</ul>
					</article>
					{/*----------------------------DropDown Sortby---------------------------------*/}
					<article>
						<SortDropDown menu={menu} />
					</article>
				</div>
			</div>
		</section>
	);
};

export default SearchList;
