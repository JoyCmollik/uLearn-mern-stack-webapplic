import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';

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

const DropDownButton = ({ name }) => {
	return (
		<Dropdown
			overlay={menu}
			className={`flex items-center  ${
				name === 'pages'
					? 'border-0 text-black font-bold text-base'
					: 'border border-gray-400 rounded-md  px-24 md:px-6 py-2 md:py-1 text-base text-black  font-semibold bg-secondary '
			}`}
		>
			<a href='/xyz' onClick={(e) => e.preventDefault()}>
				<Space>
					{name}
					<DownOutlined />
				</Space>
			</a>
		</Dropdown>
	);
};

export default DropDownButton;
