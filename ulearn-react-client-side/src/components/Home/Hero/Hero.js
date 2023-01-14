import React from 'react';

import { SiGooglescholar } from 'react-icons/si';
import Categories from '../BoardSectionOfCourse/Categories/Categories';

const categories = [
	{
		id: 10,
		icon: <SiGooglescholar className='text-5xl text-white  mx-auto  ' />,
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
		<div className=''>
			<section
				style={{ minHeight: 'calc(100vh-90px)' }}
				className='rounded-lg container mx-auto p-5 bg-light pb-[140px]'
			>
				{/*---------------------------banner-------------------------------*/}
				<div className='flex flex-wrap flex-col md:flex-row justify-between  items-center  '>
					<article className=''>
						{/* --------------------title------------------------------ */}
						<small className='text-xs font-semibold tracking-[.65em]'>
							Come for Learn
						</small>
						<h1 className='text-6xl font-bold text mt-5'>
							A Better <br />
							Learning Era
							<br />
							Starts Here.
						</h1>
						<p className=' text-lg '>
							While the lovely valley teems with vapour around
							me,and
							<br />
							the meridian sun strikes the upper
						</p>
						<button className='btn bg-primary border border-primary'>
							Browse Chrome
						</button>
					</article>

					{/* ------------------------image-------------------------- */}
					<article>
						<img
							src='https://lmszai.zainikthemes.com/uploads_demo/home/hero-img.png'
							alt=''
							className='max-w-2xl rounded-lg'
						/>
					</article>
				</div>
				{/*----------------------------categories------------------------------*/}
			</section>
			<div className=' grid grid-cols-1 md:grid-cols-3 gap-4 -mt-[50px]  container mx-auto px-4'>
				{categories.map((category) => (
					<Categories key={category.id} {...category} />
				))}
			</div>
		</div>
	);
};

export default Hero;
