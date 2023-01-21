import React, { useEffect, useState } from 'react';
// library components
import { Table } from 'antd';
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
		title: 'Sections',
		dataIndex: 'sections',
		key: 'sections',
		render: (sections) => <div>{sections?.length}</div>,
	},
	{
		title: 'Category',
		dataIndex: 'category',
		key: 'total',
		render: (category) => <small>{category?.name}</small>,
	},
];

const PendingCourses = () => {
	const [pendingCourses, setPendingCourses] = useState([]);
	useEffect(() => {
		if (!pendingCourses.length) {
			axios
				.get('/courses?status=pending&limit=4')
				.then((response) => {
					setPendingCourses(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	return (
		<Table
			columns={columns}
			dataSource={pendingCourses}
			pagination={false}
		/>
	);
};

export default PendingCourses;
