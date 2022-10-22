import React from 'react';
import CourseCard from '../CoursesCard/CourseCard';

const CourseCarousel = ({ courses }) => {
	return (
		<div className='carousel w-full mb-20 '>
			<div id='slide1' className='carousel-item relative w-full'>
				<div className='flex flex-wrap mx-auto'>
					{courses.slice(0, 4).map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide4' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide2' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
			<div id='slide2' className='carousel-item relative w-full'>
				<div className='flex flex-wrap '>
					{courses.slice(4, 8).map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide1' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide3' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
		</div>
	);
};

export default CourseCarousel;
