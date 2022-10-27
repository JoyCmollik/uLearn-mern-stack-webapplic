import { Pagination, Rate } from 'antd';
import React, { useState } from 'react';

const filterCategories = [
	{
		id: 73,
		img: 'https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg',
		title: `Javascript: Understanding The Weird Part...`,
		instructor: 'Johnny Depp',
		levels: 'Level 1',
		rating: '5',
		price: '50.00',
	},
	{
		id: 74,
		img: 'https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg',
		title: `Javascript: Understanding The Weird Part...`,
		instructor: 'Johnny Depp',
		levels: 'Level 1',
		rating: '5',
		price: '50.00',
	},
	{
		id: 75,
		img: 'https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg',
		title: `Javascript: Understanding The Weird Part...`,
		instructor: 'Johnny Depp',
		levels: 'Level 1',
		rating: '0',
		price: '50.00',
	},
	{
		id: 76,
		img: 'https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg',
		title: `Javascript: Understanding The Weird Part...`,
		instructor: 'Johnny Depp',
		levels: 'Level 1',
		rating: '0',
		price: '50.00',
	},
	{
		id: 77,
		img: 'https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg',
		title: `Javascript: Understanding The Weird Part...`,
		instructor: 'Johnny Depp',
		levels: 'Level 1',
		rating: '0',
		price: '50.00',
	},
];

const FilteredCards = ({ show }) => {
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [value, setValue] = useState(3);
	//pagination
	const [current, setCurrent] = useState(1);
	const onChange = (page) => {
		console.log(page);
		setCurrent(page);
	};
	return (
		<section className='p-5 '>
			<div
				className={`${
					!show
						? 'grid grid-cols-4  gap-4 items-center justify-center mb-16'
						: 'grid grid-cols-3  gap-4  items-center justify-center mb-16'
				}`}
			>
				{filterCategories.map((category) => {
					const {
						img,
						title,
						instructor,
						price,
						rating,
						levels,
						id,
					} = category;
					return (
						<div
							key={id}
							className='w-72 bg-white drop-shadow-md mx-auto border border-gray-200 rounded-lg '
						>
							<div className='px-4 pt-4 '>
								{/* ----------------------card image--------------------------- */}
								<img
									src={img}
									alt='course'
									className='rounded-xl object-cover'
								/>
							</div>
							<div className='px-5 py-3'>
								<h2 className='card-title text-base font-semibold text-dark'>
									{title}
								</h2>
								<p className='text-xs text-left capitalize text-font2  py-1  rounded-md'>
									{instructor} | {levels}
								</p>
								{/* ------------------------rating-------------------- */}
								<span>
									<Rate
										tooltips={desc}
										onChange={setValue}
										value={value}
									/>
									{value ? (
										<span className='ant-rate-text'>
											{desc[value - 1]}
										</span>
									) : (
										''
									)}
								</span>
								{/* -------------------------$course price---------------------------- */}
								<div className=''>
									<p className='font-semibold text-font2'>
										$ {price}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			{/*-------------------------pagination-------------------------*/}
			<Pagination
				current={current}
				onChange={onChange}
				total={200 / 10}
			/>
		</section>
	);
};

export default FilteredCards;
