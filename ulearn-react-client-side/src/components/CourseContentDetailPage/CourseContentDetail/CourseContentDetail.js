import React from 'react';
import { useParams } from 'react-router-dom';
import CourseContentDetailBanner from '../CourseContentDetailBanner/CourseContentDetailBanner';
import CourseContentDetailTutorial from '../CourseContentDetailTutorial/CourseContentDetailTutorial';
const CourseContentDetail = () => {
	const { contentDetailId } = useParams();
	return (
		<section className='container mx-auto pt-10'>
			<CourseContentDetailBanner />
			<CourseContentDetailTutorial />
		</section>
	);
};

export default CourseContentDetail;
