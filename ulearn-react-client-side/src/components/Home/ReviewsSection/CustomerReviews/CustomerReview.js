import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

import ReviewCard from '../ReviewCard/ReviewCard';

const reviews = [
	{
		id: 41,
		name: 'DANIEL JHON',
		position: 'UI/UX DESIGNER',
		title: 'Great instructor, great course',
		desc: 'Wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot',
	},
	{
		id: 42,
		name: 'NORTH',
		position: 'DEVELOPER',
		title: 'Great instructor, great course',
		desc: 'Wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot',
	},
	{
		id: 43,
		name: 'HIBRUPATH',
		position: 'MARKETER',
		title: 'Great instructor, great course',
		desc: 'Noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence',
	},
];

const CustomerReview = () => {
	return (
		<section className=' min-h-screen '>
			<div className='container mx-auto py-[110px]'>
				<div className=''>
					<div className='flex justify-center'>
						<AiOutlineComment className='text-6xl text-purple-800 mb-[18px]' />
					</div>
					{/*------------------------title----------------------------*/}
					<h2 className='capitalize font-bold text-4xl text-center pb-20'>
						what our valuable customer says
					</h2>
				</div>
				{/*------------------------review card----------------------------*/}
				<div className='grid grid-cols-3 gap-6'>
					{reviews.map((review) => (
						<ReviewCard key={review.id} {...review} />
					))}
				</div>
			</div>
		</section>
	);
};

export default CustomerReview;
