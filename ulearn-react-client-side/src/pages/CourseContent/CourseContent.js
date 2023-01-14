import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// component imports
import CourseContentHeader from '../../components/CourseContent/CourseContentHeader/CourseContentHeader';
import CourseContentTabs from '../../components/CourseContent/CourseContentTabs/CourseContentTabs';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import { Footer } from 'antd/lib/layout/layout';

const CourseContent = () => {
	const { contentId } = useParams();
	const [courseContent, setCourseContent] = useState({});

	useEffect(() => {
		if (contentId) {
			axios
				.get(`/courses/${contentId}/sections`)
				.then((response) => {
					//console.log(response.data.courses);
					setCourseContent(response.data.course);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [contentId]);

	return (
		<div className='space-y-4'>
			<NavigationBar />
			<div className='container mx-auto min-h-screen pb-10'>
				{courseContent && (
					<>
						<CourseContentHeader courseContent={courseContent} />
						<CourseContentTabs courseContent={courseContent} />
					</>
				)}
			</div>
		</div>
	);
};

export default CourseContent;
