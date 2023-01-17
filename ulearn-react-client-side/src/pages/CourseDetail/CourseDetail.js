import React, { useEffect, useState } from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../../components/CourseDetail/CourseDetailBanner/CourseDetailBanner';
import CourseDetailTabs from '../../components/CourseDetail/CourseDetailTabs/CourseDetailTabs';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

const CourseDetail = () => {
	const { courseId } = useParams();
	const [singleCourse, setSingleCourse] = useState({});
	const [isEnrolling, setIsEnrolling] = useState(false);

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

	// function - to enrol user to the current course
	const handleEnrollCourse = (courseId) => {
		setIsEnrolling(true);
		axios
			.patch('/courses/users', { courseId, isAdd: true })
			.then((response) => {
				console.log(response.data.currLearner);
				message.success('Course is enrolled successfully');
				setSingleCourse((course) => {
					return {
						...course,
						currLearners: response.data.currLearners,
					};
				});
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsEnrolling(false);
			});
	};

	return (
		<div>
			<NavigationBar />
			<CourseDetailBanner singleCourse={singleCourse} />
			<CourseDetailTabs
				singleCourse={singleCourse}
				handleEnrollCourse={handleEnrollCourse}
				isEnrolling={isEnrolling}
			/>
			<Footer style={{ background: '#040453' }}>
				<FooterComponent />
			</Footer>
		</div>
	);
};

export default CourseDetail;
