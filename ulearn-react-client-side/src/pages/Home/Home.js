import React from 'react';
import { Layout } from 'antd';

import Hero from '../../components/Home/Hero/Hero';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import CoursesSelection from '../../components/Home/BoardSectionOfCourse/CoursesSelection/CoursesSelection';
import CustomerReview from '../../components/Home/ReviewsSection/CustomerReviews/CustomerReview';
import FrequentlyAskQuestions from '../../components/Home/FAQ/FrequentlyAskQuestions/FrequentlyAskQuestions';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';

const { Footer, Content } = Layout;
const Home = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: '#e3edf9' }}>
					<Hero />
					<CoursesSelection />
					<CustomerReview />
					<FrequentlyAskQuestions />
				</Content>
				<Footer style={{ background: '#F79903' }}>
					<FooterComponent />
				</Footer>
			</Layout>
		</>
	);
};

export default Home;
