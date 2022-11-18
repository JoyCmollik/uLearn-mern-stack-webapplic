import React, { useState } from 'react';
import {
	CaretDownOutlined,
	SmileOutlined,
	BellOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { Tabs } from 'antd';
import CourseContentTabsDiscussionAll from './CourseContentTabsDiscussionAll';

const menu = (
	<Menu
		items={[
			{
				key: '1',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.antgroup.com'
					>
						1st menu item
					</a>
				),
			},
			{
				key: '2',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.aliyun.com'
					>
						2nd menu item
					</a>
				),
				icon: <SmileOutlined />,
			},
			{
				key: '3',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.luohanacademy.com'
					>
						3rd menu item
					</a>
				),
			},
		]}
	/>
);

const CourseContentDiscussionList = () => {
	const onChange = (key) => {
		console.log(key);
	};
	return (
		<section className='px-5'>
			<article className='grid grid-cols-2 justify-between pb-8 pt-4'>
				{/*------------------title--------------------*/}
				<div>
					<h2 className='text-2xl'>Discussion</h2>
				</div>
				<div className=' flex items-center justify-end space-x-6'>
					{/*----------------follow drop down----------------*/}
					<div className='border border-gray-300 flex items-center px-6 pt-2 rounded-full'>
						<Dropdown overlay={menu} className=''>
							<a href='/xyz' onClick={(e) => e.preventDefault()}>
								<div className='flex  space-x-3 items-center'>
									<BellOutlined
										className='pb-1 '
										style={{ color: 'black' }}
									/>
									<h4 className='text-sm font-bold'>
										Follow
									</h4>
									<CaretDownOutlined
										className='pb-1'
										style={{ color: 'black' }}
									/>
								</div>
							</a>
						</Dropdown>
					</div>
					{/*--------------add new topic---------------------*/}
					<div>
						<Link to='addTopic'>
							<button className='text-sm font-bold text-white px-6 py-2 bg-zinc-800 rounded-full'>
								New Topic
							</button>
						</Link>
					</div>
				</div>
			</article>

			{/*----------------------------------search-----------------------------*/}
			<div className='flex items-center justify-between space-x-3 bg-white border border-gray-300  rounded-full py-2 px-4 mb-6'>
				<div>
					<AiOutlineSearch className='text-xl ml-3 inline-block text-gray-500 ' />
					<input
						type='text'
						placeholder='Search discussions...'
						className='text-base text-black focus:outline-none m-1 '
					/>
				</div>
				<div className='flex items-center space-x-3'>
					<BsFilter className='text-xl ml-3 inline-block text-black ' />
					<button className='font-bold text-base'>Filters</button>
				</div>
			</div>
			{/*----------------------------------Tabs-----------------------------*/}
			<article className=' '>
				<div className=' '>
					<Tabs
						defaultActiveKey='1'
						onChange={onChange}
						tabBarExtraContent={
							<Dropdown overlay={menu} className=''>
								<a
									href='/xyz'
									onClick={(e) => e.preventDefault()}
								>
									<div className='flex  space-x-3 items-center'>
										<h4 className='text-sm font-bold'>
											Hotness
										</h4>
										<CaretDownOutlined
											className='pb-1 '
											style={{ color: 'black' }}
										/>
									</div>
								</a>
							</Dropdown>
						}
						items={[
							{
								label: `All`,
								key: '1',
								children: (
									<div>
										<CourseContentTabsDiscussionAll />
									</div>
								),
							},
							{
								label: `Owned`,
								key: '2',
								children: `Content of Tab Pane 2`,
							},
							{
								label: `Bookmarks`,
								key: '3',
								children: `Content of Tab Pane 3`,
							},
						]}
					/>
				</div>
			</article>
		</section>
	);
};

export default CourseContentDiscussionList;
