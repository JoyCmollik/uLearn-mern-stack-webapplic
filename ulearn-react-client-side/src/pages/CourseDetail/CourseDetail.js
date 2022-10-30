import React from 'react';
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../../components/CourseDetail/CourseDetailBanner/CourseDetailBanner';
import CourseDetailTabs from '../../components/CourseDetail/CourseDetailTabs/CourseDetailTabs';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';

const CourseDetail = () => {
	const { courseId } = useParams();
	return (
		<div>
			<NavigationBar />
			<CourseDetailBanner />
			<CourseDetailTabs />
		</div>
	);
};

export default CourseDetail;
