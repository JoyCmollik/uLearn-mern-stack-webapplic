import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../../components/CourseDetail/CourseDetailBanner/CourseDetailBanner';
import CourseDetailTabs from '../../components/CourseDetail/CourseDetailTabs/CourseDetailTabs';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

const CourseDetail = () => {
	const { courseId } = useParams();
	const [singleCourse, setSingleCourse] = useState({});

	useEffect(() => {
		axios
			.get(`/courses/${courseId}`)
			.then((response) => {
				//console.log(response.data.courses);
				setSingleCourse(response.data.course);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<NavigationBar />
			<CourseDetailBanner singleCourse={singleCourse} />
			<CourseDetailTabs singleCourse={singleCourse} />
		</div>
	);
};

export default CourseDetail;
