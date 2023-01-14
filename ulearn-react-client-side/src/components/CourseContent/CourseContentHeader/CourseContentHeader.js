import React from 'react';
import './CourseContentHeader.css';
import { Progress, Space } from 'antd';
const CourseContentHeader = ({ courseContent }) => {
	const { courseTitle, courseShortDesc, instructor } =
		courseContent;
	return (
		<section className='py-4'>
			{/*-----------------course title and info---------------------*/}
			<div className='flex items-center justify-between'>
				<article className='flex-grow'>
					<h2 className='text-dark text-3xl font-semibold'>
						{courseTitle ? courseTitle : ''}
					</h2>
					<p className='text-font2 text-base font-normal w-8/12'>
						{courseShortDesc ? courseShortDesc : ''}
					</p>
					{/*-----------------btn and progress bar---------------------*/}
					<div className='w-8/12 items-center'>
						<div className='col-span-3'>
							<Progress
								className='course-content-progress-inner-color'
								percent='7'
								status='5'
								strokeColor={{
									from: 'green',
									to: 'green',
								}}
								showInfo={false}
							/>
							<div className='flex justify-between items-center'>
								<span>7% complete</span>
								<span>completion</span>
							</div>
						</div>
					</div>
				</article>
				{/*-----------------course image---------------------*/}
				<article className='self-end'>
					<div className='flex space-x-1 items-center bg-light rounded-lg p-2'>
						<img
							className='w-[40px] h-[40px] rounded-full object-cover'
							src={instructor?.avatarURL}
							alt={instructor?.name}
						/>
						<div className=''>
							<small className='text-font2'>created by</small>
							<p className='m-0 font-medium'>{instructor?.name}</p>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
};

export default CourseContentHeader;
