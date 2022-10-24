import React, { useState } from 'react';
import { TfiQuoteRight } from 'react-icons/tfi';
import { Divider, Rate } from 'antd';
const ReviewCard = ({ title, name, position, desc }) => {
	const reviews = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [value, setValue] = useState(3);
	return (
		<div className='w-96 mb-5 md:mb-0 mx-auto'>
			<div className='flex  gap-3 ml-5 '>
				<p>
					<TfiQuoteRight className='text-6xl text-gray-400 font-light' />
				</p>
				{/* --------------------name & position------------------------ */}
				<div className=''>
					<h3 className='text-base font-bold'>{name}</h3>
					<h4 className='text-sm text-dark tracking-[.35em]'>
						{position}
					</h4>
				</div>
			</div>
			<Divider />
			<div className='flex flex-col space-y-4'>
				{/* ----------------------title&description---------------------------- */}
				<div className='flex flex-col space-y-6'>
					<h4 className='font-semibold text-xl'>{title}</h4>
					<p className='text-base w-[310px]'>{desc}</p>
				</div>
				{/*-----------------------------rating--------------------------- */}
				<span>
					<Rate
						tooltips={reviews}
						onChange={setValue}
						value={value}
					/>
					{value ? (
						<span className='ant-rate-text'>
							{reviews[value - 1]}
						</span>
					) : (
						''
					)}
				</span>
			</div>
		</div>
	);
};

export default ReviewCard;
