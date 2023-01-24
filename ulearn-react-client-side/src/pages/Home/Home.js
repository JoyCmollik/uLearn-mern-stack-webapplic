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

const Home = () => {
	const [categories, setCategoires] = useState(null);
	const [newCourses, setNewCourses] = useState(null);
	const [bestCourses, setBestCourses] = useState(null);
	const [instructors, setInstructors] = useState(null);

	useEffect(() => {
		if (!categories) {
			axios
				.get('/categories?limit=6&sort=_id')
				.then((response) => {
					//console.log(response.data.categories);
					setCategoires(response.data.categories);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (!newCourses) {
			axios
				.get('/courses?limit=4&sort=-_id')
				.then((response) => {
					setNewCourses(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (!bestCourses) {
			axios
				.get('/courses?limit=1&averageRating[gte]=4')
				.then((response) => {
					setBestCourses(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (!instructors) {
			axios
				.get('/users?role=instructor')
				.then((response) => {
					setInstructors(response.data.users);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	console.log(newCourses);
	return (
		<>
			<NavigationBar theme='light' />
			<div className=' space-y-24'>
				<Hero />
				<Categories categories={categories} />
				<NewestCourses newCourses={newCourses} />
				<BestReviewedCourses bestCourses={bestCourses} />
				<Instructors instructors={instructors} />
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
