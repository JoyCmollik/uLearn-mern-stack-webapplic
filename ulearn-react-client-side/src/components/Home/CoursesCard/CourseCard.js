import React from 'react';

const CourseCard = (props) => {
	const { title, price, rating, avatar, img, time, lecture, status } =
		props.course;
	console.log(props.course);

	return (
		<div className='card w-72 bg-white  shadow-xl mx-auto border border-black'>
			<figure className='px-3 pt-3'>
				<img src={img} alt='course' className='rounded-xl' />
			</figure>
			<div className='card-body'>
				<p className='text-xs text-left capitalize bg-primary text-white w-16 py-1 px-2 rounded-md'>
					{status}
				</p>
				<h2 className='card-title text-base'>{title}</h2>
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
						checked
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-200'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-200'
					/>
				</div>
				<div className='card-actions'>
					<button className='btn btn-primary'>Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
