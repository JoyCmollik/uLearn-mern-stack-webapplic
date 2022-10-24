import React from 'react';
import { UpOutlined } from '@ant-design/icons';
import { Collapse, Space } from 'antd';
import './CollapseItems.css';
const { Panel } = Collapse;

const headers = [
	{
		id: 1,
		que: '1. which I enjoy with my whole heart am alone feel?',
		text: `Ranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that was a greater artist than now. When, while the lovely valley with vapour around me, and the meridian.`,
	},
	{
		id: 2,
		que: '2. which I enjoy with my whole heart am alone feel?',
		text: ` Ranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that was a greater artist than now. When, while the lovely valley with vapour around me, and the meridian.`,
	},
	{
		id: 3,
		que: '3. which I enjoy with my whole heart am alone feel?',
		text: `Ranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that was a greater artist than now. When, while the lovely valley with vapour around me, and the meridian.`,
	},
];

const CollapseItems = () => {
	return (
		<Collapse
			accordion
			bordered={false}
			defaultActiveKey={['1']}
			expandIcon={({ isActive }) => (
				<Space className=''>
					<UpOutlined
						rotate={isActive ? 180 : 0}
						className='mb-5 text-[#040453] hover:text-violet-500'
					/>
				</Space>
			)}
			expandIconPosition='right'
			className='site-collapse-custom-collapse '
		>
			{headers.map((header) => {
				return (
					<Panel
						header={
							<Space className='text-[#040453] hover:text-violet-500'>
								{header.que}
							</Space>
						}
						key={header.id}
						className='site-collapse-custom-panel text-lg font-semibold px-[30px]   '
					>
						<p className='font-normal p-30 text-sm leading-[25px] blue-6 '>
							{header.text}
						</p>
					</Panel>
				);
			})}
		</Collapse>
	);
};

export default CollapseItems;
