import React, { useState } from 'react';
import heroImage from '../../../images/hero.png';

import { SiGooglescholar } from 'react-icons/si';
import Categories from '../Categories/Categories';

const categories = [
	{
		id: 10,
		icon: (
			<SiGooglescholar className='text-5xl text-white  mx-auto bg-violet-700 ' />
		),
		title: 'Learn From Experts',
		desc: 'Mornings of spring which I  enjoy with my whole heart about the gen',
		bgColor: ' bg-violet-700',
	},
	{
		id: 11,
		icon: <SiGooglescholar className='text-5xl  text-white  mx-auto' />,
		title: 'Learn From Experts',
		desc: 'Mornings of spring which I enjoy with my whole heart about the gen',
		bgColor: ' bg-blue-700',
	},
	{
		id: 12,
		icon: <SiGooglescholar className='text-5xl  text-white  mx-auto' />,
		title: 'Learn From Experts',
		desc: 'Mornings of spring which I enjoy with my whole heart about the gen',
		bgColor: ' bg-teal-700',
	},
];

const Hero = () => {
	return (
		<section className='mb-56 md:mb-0'>
			<div className='hero min-h-screen bg-base-200 pb-28  relative'>
				<div className='hero-content flex justify-between  '>
					<article className=''>
						<small className=''>Come for Learn</small>
						<h1 className='text-5xl font-bold text mt-5'>
							A Better <br />
							Learning Era
							<br />
							Starts Here.
						</h1>
						<p className='py-6 text-xl'>
							While the lovely valley teems with vapour around
							me,and
							<br />
							the meridian sun strikes the upper
						</p>
						<button className='btn bg-primary border border-primary'>
							Browse Chrome
						</button>
					</article>
					<article>
						<img
							src={heroImage}
							alt=''
							className='max-w-lg rounded-lg '
						/>
					</article>
				</div>
				{/* categories */}
				<div className='absolute bottom-1 mr-auto md:mr-0 top-96  mt-56 md:mt-28 '>
					<article className='flex flex-col md:flex-row flex-wrap  space-x-7 md:space-y-0 space-y-7  '>
						{categories.map((category) => (
							<Categories key={category.id} {...category} />
						))}
					</article>
				</div>
			</div>
		</section>
	);
};

export default Hero;
