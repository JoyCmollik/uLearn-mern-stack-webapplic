import React from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const SortDropDown = ({ menu }) => {
	return (
		<Dropdown
			overlay={menu}
			trigger={['click']}
			className='flex justify-center items-center'
		>
			<a
				href='/'
				onClick={(e) => e.preventDefault()}
				className='flex items-center border border-gray-300'
			>
				<Space className='text-base text-font2 py-2 px-6'>
					Sort{' '}
					<span className='text-[15px] text-font1 font-medium'>
						By: Default
					</span>
					<DownOutlined />
				</Space>
			</a>
		</Dropdown>
	);
};

export default SortDropDown;
