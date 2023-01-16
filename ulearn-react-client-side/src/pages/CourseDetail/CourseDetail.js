import { Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../../components/CourseDetail/CourseDetailBanner/CourseDetailBanner';
import CourseDetailTabs from '../../components/CourseDetail/CourseDetailTabs/CourseDetailTabs';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

const CourseDetail = () => {
	const { courseId } = useParams();
	const [singleCourse, setSingleCourse] = useState({});

	useEffect(() => {
		if (courseId) {
			axios
				.get(`/courses/${courseId}`)
				.then((response) => {
					//console.log(response.data.courses);
					setSingleCourse(response.data.course);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [courseId]);
	return (
		<div>
			<NavigationBar />
			<CourseDetailBanner singleCourse={singleCourse} />
			<CourseDetailTabs singleCourse={singleCourse} />
			<Footer style={{ background: '#040453' }}>
				<FooterComponent />
			</Footer>
		</div>
	);
};

export default CourseDetail;
