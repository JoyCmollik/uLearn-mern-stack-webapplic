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
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: 'white' }}>
					<Hero />
					<NewestCourses />
					<BestReviewedCourses />
					<Categories />
					<Instructors />
					<Testimonials />
					<Features />
				</Content>
				<Footer style={{ background: '#040453' }}>
					<FooterComponent />
				</Footer>
			</Layout>
		</>
	);
};

export default Home;
