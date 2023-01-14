import { PageHeader } from 'antd';
import React from 'react';

const CourseContentDetail = ({	courseContent }) => {
	console.log(courseContent);

	return (
		<section className='container mx-auto pt-10'>
			<div className='pt-6'>
				{/*----------------------title and image-------------------------------*/}
				<div className='grid grid-cols-2'>
					<article className=' flex items-center space-x-3'>
						<div>
							<PageHeader
								className='site-page-header'
								onBack={() => window.history.back()}
								title={courseContent.courseTitle}
							/>
						</div>
					</article>
				</div>
				{/*-----------------------course description--------------------------*/}
				<div></div>
			</div>
		</section>
	);
};

export default CourseContentDetail;
