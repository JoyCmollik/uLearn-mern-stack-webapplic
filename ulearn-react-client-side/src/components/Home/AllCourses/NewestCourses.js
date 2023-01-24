import React from 'react';
import CourseCard from './CourseCard';

const NewestCourses = ({ newCourses }) => {
	return (
		<section className=' container mx-auto '>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Newest Courses</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Recently published courses
			</p>
			<div className='grid grid-cols-4 gap-4 mx-auto'>
				{newCourses?.slice(0, 4).map((course) => (
					<CourseCard key={course?._id} course={course} />
				))}
			</div>
		</section>
	);
};

export default NewestCourses;
