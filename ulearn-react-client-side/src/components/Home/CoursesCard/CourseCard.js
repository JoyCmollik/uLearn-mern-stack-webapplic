import React from 'react';

import { BiTimeFive, BiNotepad } from 'react-icons/bi';

const CourseCard = (props) => {
	const { id, title, price, avatar, img, time, lecture, status } =
		props.course;

	return (
		<div className='card w-72 bg-white drop-shadow-md mx-auto border border-gray-200'>
			<figure className='px-3 pt-3 relative'>
				<img
					src={img}
					alt='course'
					className='rounded-xl object-cover'
				/>
				<div className='absolute top-3 right-4'>
					<button className='btn-sm btn-active btn-ghost text-white font-semibold rounded-lg'>
						$ {price}
					</button>
				</div>
			</figure>
			<div className='card-body'>
				<p className='text-xs text-left capitalize bg-primary text-white w-16 py-1 px-2 rounded-md'>
					{status}
				</p>
				<h2 className='card-title text-base font-semibold text-dark'>
					{title}
				</h2>
				{/* rating */}
				<div className='rating  rating-sm mb-4'>
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
					<span className='text-sm ml-5'>(2) reviews</span>
				</div>
				{/* avatar */}
				<div className='flex justify-between'>
					<div className='avatar-group -space-x-6'>
						<div className='avatar'>
							<div className='w-8'>
								<img src={avatar} alt='avatar' />
							</div>
						</div>
						<div className='avatar'>
							<div className='w-8'>
								<img src={avatar} alt='avatar' />
							</div>
						</div>
					</div>
					<div>
						<button className='btn btn-sm text-xs btn-link text-primary no-underline'>
							view
						</button>
					</div>
				</div>
				<div className='border border-gray-300 my-2 h-0'></div>
				{/* card footer */}
				<div className='flex justify-between'>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary'>
						<BiTimeFive />
						{time} Hours
					</div>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary'>
						<BiNotepad />
						{lecture} Lecture
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
