import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Home = ({data}) => {
	const {
		displayCategories, categories,
		newCourses,
		bestCourses,
		instructors,
	} = data;
	const { user } = useAuth();

	return (
		<>
			<NavigationBar categories={categories} theme='light' />
			<div className=' space-y-24'>
				<Hero />
				<Categories categories={displayCategories} />
				<NewestCourses newCourses={newCourses} />
				<BestReviewedCourses bestCourses={bestCourses} />
				{user && instructors ? (
					<Instructors instructors={instructors} />
				) : null}
				<Testimonials />
				<Features />
				<div className='bg-background2 bg-center bg-cover'>
					<FooterComponent />
				</div>
			</div>
		</>
	);
};

export default Home;
