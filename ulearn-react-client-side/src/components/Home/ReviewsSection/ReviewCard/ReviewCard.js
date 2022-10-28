import React, { useState } from 'react';
import { TfiQuoteRight } from 'react-icons/tfi';
import { Divider, Rate } from 'antd';
const ReviewCard = ({ title, name, position, desc }) => {
	const reviews = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [value, setValue] = useState(3);
	return (
		<div className='mx-auto rounded-lg'>
			<div className='flex space-x-3'>
				<p>
					<TfiQuoteRight className='text-6xl text-font1 font-light' />
				</p>
				{/* --------------------name & position------------------------ */}
				<div className=''>
					<h3 className='text-base font-bold'>{name}</h3>
					<h4 className='text-sm text-dark tracking-[.35em]'>
						{position}
					</h4>
				</div>
			</div>
			<Divider className='bg-gray-300' />
			<div className='flex flex-col space-y-4'>
				{/* ----------------------title&description---------------------------- */}
				<div className='flex flex-col space-y-6'>
					<h4 className='font-semibold text-xl'>{title}</h4>
					<p className='text-base '>{desc}</p>
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
