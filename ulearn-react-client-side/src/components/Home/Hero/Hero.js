import React from 'react';
import heroImage from '../../../images/hero.png';

import { SiGooglescholar } from 'react-icons/si';
import Categories from '../Categories/Categories';

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
		<section className='min-h-screen border-box border md:mb-36 '>
			<div className='container mx-auto mt-10 md:relative'>
				<div className='flex flex-col md:flex-row justify-center items-center'>
					<div className='flex flex-wrap flex-col md:flex-row justify-center space-x-4 items-center'>
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

						<article>
							{/* ------------------------image-------------------------- */}

							<img
								src={heroImage}
								alt=''
								className='max-w-2xl rounded-lg '
							/>
						</article>
					</div>
					{/*----------------------------categories------------------------------*/}
					<div className='md:absolute top-3/4 mt-10 md:mt-24 mx-auto mb-20 md:mb-0'>
						<article className='flex flex-wrap flex-col gap-5 md:flex-row justify-center items-center '>
							{categories.map((category) => (
								<Categories key={category.id} {...category} />
							))}
						</article>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
