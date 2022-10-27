import React, { useState } from 'react';
import { Collapse, Space, InputNumber } from 'antd';
import {
	UpOutlined,
	PlusOutlined,
	MinusOutlined,
	StarFilled,
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import './FilterMenu.css';

const categories = [
	{
		id: 1,
		que: 'Developemnt',
		text: [
			'Game Development',
			'Apple',
			'Career Development',
			'Communication',
		],
	},
	{
		id: 2,
		que: 'Business',
		text: ['google'],
	},
	{
		id: 3,
		que: 'IT and Software',
		text: ['Data Science', 'Creativity'],
	},
	{
		id: 4,
		que: 'Design',
		text: ['Graphics Design', 'Fashion Design'],
	},
];
const courseLevels = ['higher', 'medium'];
const ratings = [
	'1 Star or above',
	'2 Star or above',
	'3 Star or above',
	'4 Star or above',
	'5 Star',
];
const prices = ['free', 'paid'];
const priceValues = [
	{ text: 'Min', prevValues: 0, minValue: 0, maxValue: 10 },
	{ text: 'Max', prevValues: 69.0, minValue: 0, maxValue: 1000 },
];

const duration = [
	'Less Than 24 Hours',
	'24 To 36 Hours',
	'36 To 72 Hours',
	'Above 72 Hours',
];

const { Panel } = Collapse;

const FilterMenu = () => {
	//for collapse
	const onChange = (key) => {
		console.log(key);
	};
	//for checkbox
	const handleCheck = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	//for inputform
	const [keyboard, setKeyboard] = useState(true);
	return (
		<Collapse
			style={{
				borderLeft: 0,
				border: '1 px solid #e5e8ec',
				background: '#EFEFEF',
			}}
			defaultActiveKey={['1']}
			onChange={onChange}
			expandIcon={({ isActive }) => (
				<Space className='rounded-full  border border-[#5f5f76] pb-1 px-2'>
					<UpOutlined
						style={{
							fontSize: '8px',
							color: '#5f5f76',
						}}
						rotate={isActive ? 180 : 0}
					/>
				</Space>
			)}
			expandIconPosition='end'
		>
			{/*--------------------------categories-------------------------------*/}
			<Panel
				header={
					<Space className='text-[17px]  text-[#040453] font-medium py-1 px-2'>
						Categories
					</Space>
				}
				key='1'
				className='collapseHeader'
			>
				<Collapse
					style={{ background: '#EFEFEF' }}
					accordion
					bordered={false}
					defaultActiveKey='1'
					expandIconPosition='end'
					expandIcon={({ isActive }) => (
						<Space className=''>
							{isActive ? (
								<MinusOutlined
									style={{
										color: '#040453',
									}}
								/>
							) : (
								<PlusOutlined
									style={{
										color: '#040453',
									}}
								/>
							)}
						</Space>
					)}
				>
					{categories.map((category) => {
						return (
							<Panel
								style={{
									borderBottom: 0,
								}}
								header={
									<Space className='text-[#040453] font-medium'>
										{category.que}
									</Space>
								}
								key={category.id}
								className='site-collapse-custom-panel collapseHeader'
							>
								<div className='flex space-y-3 flex-col'>
									{category.text.map((text, index) => (
										<span key={index}>
											<Checkbox onChange={handleCheck}>
												{text}
											</Checkbox>
										</span>
									))}
								</div>
							</Panel>
						);
					})}
				</Collapse>
			</Panel>
			{/*--------------------------------course level-----------------------------*/}
			<Panel
				header={
					<Space className='text-[17px]  text-[#040453] font-medium'>
						Course Level
					</Space>
				}
				key='4'
				className='site-collapse-custom-panel   collapseHeader'
			>
				<div className='flex space-y-3 flex-col'>
					{courseLevels.map((level, index) => (
						<span key={index}>
							<Checkbox onChange={handleCheck}>{level}</Checkbox>
						</span>
					))}
				</div>
			</Panel>
			{/*--------------------------------Rating-----------------------------*/}
			<Panel
				header={
					<Space className='text-[17px]  text-[#040453] font-medium'>
						Rating
					</Space>
				}
				key='5'
				className='site-collapse-custom-panel   collapseHeader'
			>
				<div className='flex space-y-3 flex-col'>
					{ratings.reverse().map((rating, index) => (
						<article key={index}>
							<Checkbox onChange={handleCheck}>
								<div className='flex flex-row items-center text-sm '>
									<StarFilled className='starIconCollapse' />
									{rating}
								</div>
							</Checkbox>
						</article>
					))}
				</div>
			</Panel>
			{/*--------------------------------Price-----------------------------*/}
			<Panel
				header={
					<Space className='text-[17px] text-[#040453] font-medium'>
						Price
					</Space>
				}
				key='6'
				className='site-collapse-custom-panel   collapseHeader'
			>
				<div className='flex flex-col space-y-3 items-start'>
					{priceValues.map((priceValue, index) => {
						const { text, prevValues, minValue, maxValue } =
							priceValue;

						return (
							<div
								key={index}
								className='border border-gray-300 '
							>
								<span className='ml-3'>{text}</span>:
								<InputNumber
									min={minValue}
									max={maxValue}
									keyboard={keyboard}
									defaultValue={prevValues}
									bordered={false}
								/>
							</div>
						);
					})}
				</div>
				<div className='flex space-y-3 flex-col mt-3'>
					{prices.map((price, index) => (
						<span key={index}>
							<Checkbox onChange={handleCheck}>{price}</Checkbox>
						</span>
					))}
				</div>
			</Panel>
			{/*--------------------------------Duration-----------------------------*/}
			<Panel
				header={
					<Space className='text-[17px]  text-[#040453] font-medium'>
						Duration
					</Space>
				}
				key='7'
				className='site-collapse-custom-panel   collapseHeader'
			>
				<div className='flex space-y-3 flex-col'>
					{duration.map((time, index) => (
						<article key={index}>
							<Checkbox onChange={handleCheck}>{time}</Checkbox>
						</article>
					))}
				</div>
			</Panel>
		</Collapse>
	);
};

export default FilterMenu;
