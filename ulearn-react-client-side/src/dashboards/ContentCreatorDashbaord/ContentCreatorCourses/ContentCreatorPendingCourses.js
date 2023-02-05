import React, { useEffect, useState } from 'react';
// library components
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const columns = [
	{
		title: 'Course',
		dataIndex: 'courseTitle',
		key: 'courseTitle',
		render: (courseTitle, data) => (
			<Link
				to={`/content-creator/dashboard/manage-courses/edit/${data?._id}`}
			>
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
		title: 'Category',
		dataIndex: 'category',
		render: (category) => (
			<div className='capitalize'>{category?.name}</div>
		),
	},
	{
		title: 'Sections',
		dataIndex: 'sections',
		key: 'total',
		render: (sections) => <div>{sections?.length}</div>,
	},
];

const ContentCreatorPendingCourses = () => {
	const [topCourses, setTopCourses] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (!topCourses.length && user) {
			axios
				.get(
					`/courses?status=pending&limit=4&instructor=${user?.userId}`
				)
				.then((response) => {
					setTopCourses(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [user]);
	return (
		<Table columns={columns} dataSource={topCourses} pagination={false} />
	);
};

export default ContentCreatorPendingCourses;
