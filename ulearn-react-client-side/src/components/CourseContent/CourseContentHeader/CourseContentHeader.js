import React from 'react';
import './CourseContentHeader.css';
import { Progress, Space } from 'antd';
const CourseContentHeader = ({ courseContent }) => {
	const { courseTitle, courseShortDesc, courseThumb } = courseContent;
	return (
		<section className='py-4'>
			{/*-----------------course title and info---------------------*/}
			<div className='flex items-center justify-between'>
				<article className=''>
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
				<article className='flex justify-end'>
					<img src={courseThumb} alt='course-logo' />
				</article>
			</div>
		</section>
	);
};

export default CourseContentHeader;
