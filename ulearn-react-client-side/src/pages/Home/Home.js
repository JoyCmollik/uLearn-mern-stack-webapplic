import React from 'react';
import { Layout } from 'antd';

import Hero from '../../components/Home/Hero/Hero';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import CoursesSelection from '../../components/Home/BoardSectionOfCourse/CoursesSelection/CoursesSelection';
import CustomerReview from '../../components/Home/ReviewsSection/CustomerReviews/CustomerReview';
import FrequentlyAskQuestions from '../../components/Home/FAQ/FrequentlyAskQuestions/FrequentlyAskQuestions';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import Features from '../../components/Home/Features/Features';

const { Footer, Content } = Layout;
const Home = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: 'white' }}>
					<Hero />
					<CoursesSelection />
					<CustomerReview />
					<FrequentlyAskQuestions />
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
