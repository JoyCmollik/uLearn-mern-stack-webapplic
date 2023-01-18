import React from 'react';
import { Layout } from 'antd';

import Hero from '../../components/Home/Hero/Hero';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import Features from '../../components/Home/Features/Features';
import NewestCourses from '../../components/Home/AllCourses/NewestCourses';
import BestReviewedCourses from '../../components/Home/AllCourses/BestReviewedCourses';
import Instructors from '../../components/Home/Instructors/Instructors';
import Testimonials from '../../components/Home/Testimonials/Testimonials';
import Categories from '../../components/Home/Categories/Categories';

const { Footer, Content } = Layout;
const Home = () => {
	return (
		<>
			<NavigationBar theme='light' />
			<div className=' space-y-24'>
				<Hero />
				<Categories />
				<NewestCourses />
				<BestReviewedCourses />
				<Instructors />
				<Testimonials />
				<Features />
				<div style={{ background: '#040453' }}>
					<FooterComponent />
				</div>
			</div>
		</>
	);
};

export default Home;
