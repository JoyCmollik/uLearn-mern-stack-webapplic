import React from 'react';
import { useParams } from 'react-router-dom';

const CourseContent = () => {
	const { contentId } = useParams();
	return (
		<div>
			<h2>Course content</h2>
		</div>
	);
};

export default CourseContent;
