import React from 'react';
import Hero from '../../components/Home/Hero/Hero';
import Navbar from '../../components/layout/Navbar/Navbar';

const Home = () => {
	return (
		<div className='text-2xl'>
			<>
				<Navbar />
				<Hero />
			</>
		</div>
	);
};

export default Home;
