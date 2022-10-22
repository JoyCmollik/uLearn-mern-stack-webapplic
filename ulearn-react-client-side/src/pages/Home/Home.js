import React from 'react';
import CourseCarousel from '../../components/CourseCarousel/CourseCarousel';
import CoursesSelection from '../../components/Home/CoursesSelection/CoursesSelection';
import Hero from '../../components/Home/Hero/Hero';
import Navbar from '../../components/layout/Navbar/Navbar';

const Home = () => {
	return (
		<div className='text-2xl'>
			<>
				<Navbar />
				<Hero />
				<CoursesSelection />
				{/* 				<CourseCarousel /> */}
			</>
		</div>
	);
};

export default Home;
