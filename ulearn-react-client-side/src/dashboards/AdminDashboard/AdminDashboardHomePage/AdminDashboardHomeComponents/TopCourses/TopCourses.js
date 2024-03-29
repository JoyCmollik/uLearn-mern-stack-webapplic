import React, { useEffect, useState } from 'react';
// library components
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const columns = [
	{
		title: 'Course',
		dataIndex: 'courseTitle',
		key: 'courseTitle',
		render: (courseTitle, data) => (
			<Link to={`/course-list/${data?._id}`}>
				<div className='text-font1'>{courseTitle}</div>
			</Link>
		),
	},
	{
		title: 'Creators Name',
		dataIndex: 'instructor',
		key: 'instructor.name',
		render: (instructor) => <div>{instructor?.name}</div>,
	},
	{
		title: 'Rating',
		dataIndex: 'averageRating',
		key: 'averageRating',
	},
	{
		title: 'Learners',
		dataIndex: 'currLearners',
		key: 'total',
		render: (currLearners) => <div>{currLearners?.length}</div>,
	},
];

const TopCourses = () => {
	const [topCourses, setTopCourses] = useState([]);
	useEffect(() => {
		if (!topCourses.length) {
			axios
				.get('/courses?averageRating[gte]=4&limit=4')
				.then((response) => {
					setTopCourses(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	return (
		<Table columns={columns} dataSource={topCourses} pagination={false} />
	);
};

export default TopCourses;
