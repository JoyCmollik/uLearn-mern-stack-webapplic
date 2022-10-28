import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
	const { courseId } = useParams();
	return (
		<div>
			<h2>course detail:{courseId}</h2>
		</div>
	);
};

export default CourseDetail;
