import React, { useState } from 'react';
import {
	CaretDownOutlined,
	SmileOutlined,
	BellOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { Link, Outlet } from 'react-router-dom';

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
	return (
		<div>
			<article className='grid grid-cols-2 justify-between px-5'>
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
						<Link to='/courseContent/addTopic'>
							<button className='text-sm font-bold text-white px-6 py-2 bg-zinc-800 rounded-full'>
								New Topic
							</button>
						</Link>
					</div>
				</div>
			</article>

			{/*search*/}
		</div>
	);
};

export default CourseContentDiscussionList;
