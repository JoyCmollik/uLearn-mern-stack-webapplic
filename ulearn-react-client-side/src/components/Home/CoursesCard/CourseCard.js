import React from 'react';

const CourseCard = (props) => {
	const { id, title, price, rating, avatar, img, time, lecture, status } =
		props.course;
	console.log(props.course);
	return (
		<div className='card w-72 bg-white  shadow-xl mx-auto border border-black'>
			<figure className='px-3 pt-3'>
				<img src={img} alt='Shoes' className='rounded-xl' />
			</figure>
			<div className='card-body'>
				<p className='text-base text-left capitalize bg-primary text-white'>
					{status}
				</p>
				<h2 className='card-title'>{title ? title : ''}</h2>
				<div className='card-actions'>
					<button className='btn btn-primary'>Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
