import React from 'react';
import { Outlet } from 'react-router-dom';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import NestedLink from '../NestedLink/NestedLink';

const nestedlinks = [
	{ id: 21, to: '/home/development', text: 'Development' },
	{ id: 22, to: '/home/business', text: 'Business' },
	{ id: 23, to: '/home/software', text: 'Software' },
	{ id: 24, to: '/home/Design', text: 'Design' },
];

const CoursesSelection = () => {
	return (
		<section className='bg-base-100 pt-96 md:pt-24 container mx-auto min-h-screen'>
			{/* title and icon */}
			<div className='flex flex-col  ml-6 space-y-5 md:space-y-0'>
				<article className='flex  flex-row items-center space-x-5 mb-4 text-dark font-medium'>
					<MdOutlineScreenSearchDesktop className='text-6xl text-left' />

					<h2 className='text-[41px]  md:whitespace-nowrap  '>
						A Broad Selection Of
						<br />
						Courses.
					</h2>
				</article>
				<article className='flex flex-col md:flex-row justify-between items-center'>
					<p className='text-sm'>
						CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW
						ADDITIONS
					</p>
					{/* course nested route */}
					<div className='flex flex-row text-base font-bold  gap-5 text-gray-700'>
						{nestedlinks.map((link) => (
							<NestedLink key={link.id} {...link} />
						))}
					</div>
				</article>
			</div>
			<Outlet />
		</section>
	);
};

export default CoursesSelection;
