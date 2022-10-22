import React from 'react';
import CourseCard from '../CoursesCard/CourseCard';

const CourseCarousel = ({ courses }) => {
	return (
		<div className='carousel w-full'>
			<div id='slide1' className='carousel-item relative w-full'>
				<div className='flex flex-wrap mx-auto md:flex-none md:flex-nowrap'>
					{courses.slice(0, 4).map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide1' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide2' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
			<div id='slide2' className='carousel-item relative w-full'>
				<div className='flex flex-wrap md:flex-none md:flex-nowrap mx-auto'>
					{courses.slice(4, 8).map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide1' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide2' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
		</div>
	);
};

export default CourseCarousel;
