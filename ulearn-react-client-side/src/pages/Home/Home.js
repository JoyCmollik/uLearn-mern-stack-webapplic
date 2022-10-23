import React from 'react';
import { Layout } from 'antd';

import CoursesSelection from '../../components/Home/CoursesSelection/CoursesSelection';
import CustomerReview from '../../components/Home/CustomerReviews/CustomerReview';
import Hero from '../../components/Home/Hero/Hero';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

const { Footer, Content } = Layout;
const Home = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />

				<Content>
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
