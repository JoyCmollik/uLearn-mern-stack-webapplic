import React from 'react';

// library components
import { Table, Tag } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const columns = [
	{
		title: 'Title',
		dataIndex: 'courseTitle',
		key: 'courseTitle',
	},
	{
		title: 'Category',
		key: 'category',
		dataIndex: 'category',
		render: (category) => (
			<div className='flex flex-wrap space-x-1'>
				{/* {categories.map((tag) => ( */}
				<Tag className='capitalize' color='gray' key={category?._id}>
					{category?.name}
				</Tag>
				{/* ))} */}
			</div>
		),
	},
	{
		title: 'Lesson and section',
		dataIndex: 'sections',
		key: 'sections',
		render: (sections) => (
			<div className='flex flex-col space-y-1'>
				<small className='font-medium text-font2'>
					Total section:{' '}
					<span className='font-bold'>{sections?.length || 0}</span>
				</small>
				<small className='font-medium text-font2'>
					Total lesson:{' '}
					<span className='font-bold'>
						{sections.reduce(
							(prev, curr) => prev + curr?.lessons?.length,
							0
						) || 0}
					</span>
				</small>
			</div>
		),
	},
	{
		title: 'Enrolled students',
		dataIndex: 'currLearners',
		key: 'enrolledStudents',
		render: (currLearners) => (
			<small className='font-medium text-font2'>
				Total Learners:{' '}
				<span className='font-bold'>{currLearners.length}</span>
			</small>
		),
	},
	// {
	// 	title: 'Status',
	// 	key: 'status',
	// 	dataIndex: 'status',
	// 	render: (status) => {
	// 		let color = status === 'active' ? 'green' : 'red';
	// 		return (
	// 			<Tag size='small' color={color} key={status}>
	// 				{status.toUpperCase()}
	// 			</Tag>
	// 		);
	// 	},
	// },
	// {
	// 	title: 'Price',
	// 	dataIndex: 'coursePrice',
	// 	key: 'coursePrice',
	// 	render: (coursePrice) => (
	// 		<p className='text-font2 m-0'>
	// 			<span className='font-medium text-font1'>
	// 				{coursePrice ? '$' : null}
	// 			</span>
	// 			{coursePrice || coursePrice !== 0 ? (
	// 				coursePrice
	// 			) : (
	// 				<Tag color='purple'>free</Tag>
	// 			)}
	// 		</p>
	// 	),
	// },
	{
		title: 'Action',
		key: 'action',
		dataIndex: '_id',
		render: (_id) => (
			<Link to={`edit/${_id}`}>
				<button className='text-primary px-2 py-[0.5px] rounded-lg border border-primary'>
					<TfiMore size={18} />
				</button>
			</Link>
		),
	},
];

const ManageCoursesTable = ({ courses }) => {
	return <Table columns={columns} dataSource={courses} />;
};

export default ManageCoursesTable;
