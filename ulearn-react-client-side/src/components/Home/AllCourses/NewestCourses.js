import React from 'react';
import CourseCard from './CourseCard';

const courses = [
	{
		id: '31',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '32',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '33',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '34',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '35',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '36',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '37',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '38',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://placeimg.com/192/192/people',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
];
const NewestCourses = () => {
	return (
		<section className=' container mx-auto min-h-screen mt-20'>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Newest Courses</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Recently published courses
			</p>
			<div className='grid grid-cols-4 gap-4 mx-auto'>
				{courses?.slice(0, 4).map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</section>
	);
};

export default NewestCourses;
