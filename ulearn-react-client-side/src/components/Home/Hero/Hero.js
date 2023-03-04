import React from 'react';

import { SiGooglescholar } from 'react-icons/si';
import * as LottiePlayer from '@lottiefiles/lottie-player';

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
		<div className='pt-10'>
			<section className='container mx-auto bg-primary bg-opacity-5 rounded-lg h-[50vh]'>
				{/*---------------------------banner-------------------------------*/}
				<div className='h-full p-[10vw] flex justify-between items-center overflow-hidden font-lato'>
					<div className='space-y-4'>
						<h1 className='text-2xl xl:text-4xl font-bold text-font1'>
							Explore a community built <br /> for academics, with
							academics.
						</h1>
						<h4 className='m-0 p-0 text-base w-8/12 text-font2'>
							uLearn - a platform to let you organize your
							resources and share with others whilst making you a
							contributor to the society.
						</h4>
						<div className='flex space-x-4 items-center font-medium'>
							<button className='px-4 py-2 border-2 border-primary bg-primary text-white rounded-lg'>
								Sign Up
							</button>
							<button className='px-4 py-2 border-2 border-primary text-primary rounded-lg'>
								What is uLearn?
							</button>
						</div>
					</div>

					{/* <img
						src='https://lottiefiles.com/62404-academic-hut-banner'
						className='inline-block w-[350px] object-cover'
						alt='hero-banner'
					/> */}
					{/* <iframe
						className='inline-block w-[350px] object-cover'
						title='hero'
						src='https://embed.lottiefiles.com/animation/62404'
					/> */}
					<lottie-player
						autoplay
						loop
						background='#F3F6FF'
						src='https://assets2.lottiefiles.com/packages/lf20_xxyvtiab.json'
						style={{ width: '350px', height: '350px' }}
					/>
				</div>
				{/*----------------------------stats------------------------------*/}
				<div className='transform -translate-y-2/4 mx-auto bg-white w-[35vw] border-b-4 border-primary rounded-lg grid grid-cols-3 shadow-md'>
					<div className='flex flex-col justify-center items-center border-r p-4'>
						<h4 className='text-xl xl:text-2xl font-semibold text-primary m-0'>
							40+
						</h4>
						<p className='m-0 p-0 text-font2'>Courses</p>
					</div>
					<div className='flex flex-col justify-center items-center border-r p-4'>
						<h4 className='text-xl xl:text-2xl font-semibold text-primary m-0'>
							55+
						</h4>
						<p className='m-0 p-0 text-font2'>Content Creators</p>
					</div>
					<div className='flex flex-col justify-center items-center p-4'>
						<h4 className='text-xl xl:text-2xl font-semibold text-primary m-0'>
							90+
						</h4>
						<p className='m-0 p-0 text-font2'>Learners</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Hero;
