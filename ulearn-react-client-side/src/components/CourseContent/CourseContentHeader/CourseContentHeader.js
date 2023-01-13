import React from 'react';
import './CourseContentHeader.css';
import { Progress, Space } from 'antd';
const CourseContentHeader = ({ singleContent }) => {
	const { courseTitle, courseShortDesc } = singleContent;
	return (
		<section>
			{/*-----------------course title and info---------------------*/}
			<div className='grid grid-cols-2 items-center justify-between '>
				<article className=''>
					<h2 className='text-dark text-3xl font-bold'>
						{courseTitle ? courseTitle : ''}
					</h2>
					<p className='text-font2 text-base font-normal'>
						{courseShortDesc ? courseShortDesc : ''}
					</p>
					{/*-----------------btn and progress bar---------------------*/}
					<div className='grid grid-cols-5 gap-4 items-center  '>
						<div>
							<button className=' bg-gray-800 text-white py-2 px-6 text-sm rounded-2xl whitespace-nowrap border  inline-block '>
								Resume Course
							</button>
						</div>

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
								<span>certificate</span>
							</div>
						</div>
					</div>
				</article>
				{/*-----------------course image---------------------*/}
				<article className='flex justify-end'>
					<img
						src='	https://www.kaggle.com/static/images/education/km/python.svg'
						alt='course-logo'
					/>
				</article>
			</div>
		</section>
	);
};

export default CourseContentHeader;
