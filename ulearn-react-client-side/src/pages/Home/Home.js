import React from 'react';
import { Layout } from 'antd';

import Hero from '../../components/Home/Hero/Hero';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import CoursesSelection from '../../components/Home/BoardSectionOfCourse/CoursesSelection/CoursesSelection';
import CustomerReview from '../../components/Home/ReviewsSection/CustomerReviews/CustomerReview';

const { Footer, Content } = Layout;
const Home = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: '#f4f4f4' }}>
					<Hero />
					<CoursesSelection />
					<CustomerReview />
				</Content>
				<Footer>Footer</Footer>
			</Layout>
		</>
	);
};

export default Home;
