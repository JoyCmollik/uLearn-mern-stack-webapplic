import React from 'react';
import { useParams } from 'react-router-dom';

import CourseContentHeader from '../../components/CourseContent/CourseContentHeader/CourseContentHeader';
import CourseContentTabs from '../../components/CourseContent/CourseContentTabs/CourseContentTabs';
const CourseContent = () => {
	const { contentId } = useParams();
	return (
		<div className='container mx-auto min-h-screen pt-10'>
			<CourseContentHeader />
			<CourseContentTabs />
		</div>
	);
};

export default CourseContent;
