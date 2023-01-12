import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CourseContentHeader from '../../components/CourseContent/CourseContentHeader/CourseContentHeader';
import CourseContentTabs from '../../components/CourseContent/CourseContentTabs/CourseContentTabs';
const CourseContent = () => {
	const { contentId } = useParams();
	const [singleContent, setSingleContent] = useState({});

	useEffect(() => {
		axios
			.get(`/courses/${contentId}/sections`)
			.then((response) => {
				//console.log(response.data.courses);
				setSingleContent(response.data.course);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className='container mx-auto min-h-screen pt-10'>
			<CourseContentHeader singleContent={singleContent} />
			<CourseContentTabs singleContent={singleContent} />
		</div>
	);
};

export default CourseContent;
