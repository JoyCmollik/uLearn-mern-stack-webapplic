import React from 'react';

import CoursesSelection from '../../components/Home/CoursesSelection/CoursesSelection';
import CustomerReview from '../../components/Home/CustomerReviews/CustomerReview';
import Hero from '../../components/Home/Hero/Hero';
import Navbar from '../../components/layout/Navbar/Navbar';

const Home = () => {
	return (
		<div className='text-2xl'>
			<>
				<Navbar />
				<Hero />
				<CoursesSelection />
				<CustomerReview />
			</>
		</div>
	);
};

export default Home;
