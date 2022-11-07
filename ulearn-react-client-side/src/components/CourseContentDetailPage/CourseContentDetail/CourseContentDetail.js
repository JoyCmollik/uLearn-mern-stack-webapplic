import { Avatar } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
const CourseContentDetail = () => {
	const { contentDetailId } = useParams();
	return (
		<section className='container mx-auto pt-10'>
			<h1>hello</h1>
		</section>
	);
};

export default CourseContentDetail;
