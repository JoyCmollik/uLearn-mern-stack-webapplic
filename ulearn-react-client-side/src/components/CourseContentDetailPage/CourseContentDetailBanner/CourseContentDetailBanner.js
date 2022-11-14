import React from 'react';
import { Avatar, Menu } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { HiOutlineDotsVertical } from 'react-icons/hi';
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

const CourseContentDetailBanner = () => {
	return (
		<div>
			<div className='grid grid-cols-2  border-b border-gray-300'>
				<article>
					{/*----------------avatar and instructor-------------------*/}
					<div className='flex items-center space-x-3'>
						<div>
							<Avatar
								className='border border-black'
								src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
							/>
						</div>
						<div>
							<span className='font-semibold text-xs'>
								INSTRUCTOR: COLINMORRIS +3
							</span>
						</div>
					</div>
					<div className='pt-6'>
						<h2 className='font-bold text-4xl'>
							Hello, Python
							<br />
							<span className='text-base font-normal'>
								A quick introduction to Python syntax, variable
								assignment, and numbers
							</span>
						</h2>
					</div>
					{/**/}
				</article>
				{/*-----------DropDown-----------*/}
				<article className='flex justify-end'>
					<div>
						<Dropdown overlay={menu}>
							<a href='/xyz' onClick={(e) => e.preventDefault()}>
								<Space>
									<HiOutlineDotsVertical className='text-black font-extrabold text-xl' />
								</Space>
							</a>
						</Dropdown>
					</div>
				</article>
			</div>
		</div>
	);
};

export default CourseContentDetailBanner;
