import React from 'react';
import CourseCarousel from '../../CourseCarousel/CourseCarousel';

const courses = [
	{
		id: '31',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '32',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '33',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '34',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '35',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '36',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',

		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '37',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
	{
		id: '38',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		price: '80',
		rating: '5',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',
		img: 'https://i.ibb.co/6YxMZ1z/news-4.jpg',
		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
	},
];

const DesignCourse = () => {
	return (
		<section className='mt-10'>
			<div className=' '>
				<CourseCarousel courses={courses} />
			</div>
		</section>
	);
};

export default DesignCourse;
