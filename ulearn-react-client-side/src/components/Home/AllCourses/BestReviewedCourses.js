import React from 'react';
import CourseCard from './CourseCard';

const BestReviewedCourses = ({ bestCourses }) => {
	console.log(bestCourses);
	return (
		<section className=' container mx-auto  '>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Best Reviewd Courses</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Enjoy high quality and best reviewed content In Progress
			</p>
			<div className='grid grid-cols-4 gap-4 mx-auto'>
				{bestCourses?.slice(0, 4).map((course) => (
					<CourseCard key={course._id} course={course} />
				))}
			</div>
		</section>
	);
};

export default BestReviewedCourses;
