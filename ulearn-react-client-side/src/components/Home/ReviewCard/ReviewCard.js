import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';
const ReviewCard = ({ title, name, position, desc }) => {
	return (
		<div className='w-96 mb-5 md:mb-0'>
			<div className='flex  gap-3 ml-5 '>
				<p>
					<FaQuoteRight className='text-6xl text-gray-500' />
				</p>
				<div className=''>
					<h3 className='text-base font-bold'>{name}</h3>
					<h4 className='text-sm text-dark tracking-[.35em]'>
						{position}
					</h4>
				</div>
			</div>
			<div className='border border-gray-300 mt-2 mb-5'></div>
			<div className='flex flex-col space-y-4'>
				<div className='flex flex-col space-y-6'>
					<h4 className='font-semibold'>{title}</h4>
					<p className='text-lg'>{desc}</p>
				</div>
				{/* rating */}
				<div className='rating'>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
						readOnly
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
