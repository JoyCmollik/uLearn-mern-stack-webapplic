import React from 'react';

// library components
import { Popconfirm, Spin, Table, Tag } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { HiCheck, HiOutlineEye } from 'react-icons/hi2';

const ManageCoursesTable = ({
	courses,
	loadingStatus,
	handleApproveCourse,
	handleDeleteCourse,
}) => {
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
					<Tag
						className='capitalize'
						color='gray'
						key={category?._id}
					>
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
						<span className='font-bold'>
							{sections?.length || 0}
						</span>
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
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			render: (status) => {
				let color =
					status === 'active'
						? 'green'
						: status === 'pending'
						? 'yellow'
						: 'red';
				return (
					<Tag size='small' color={color} key={status}>
						<small>{status.toUpperCase()}</small>
					</Tag>
				);
			},
		},
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
			render: (_id, data) => (
				<div className='flex items-center space-x-2 text-font2'>
					{data?.status === 'pending' && (
						<button
							onClick={() => handleApproveCourse(data)}
							className='text-green-400 p-1 rounded-full border border-green-400'
							disabled={loadingStatus?.isApproving}
						>
							{loadingStatus?.isApproving &&
							loadingStatus.currCourse === data._id ? (
								<Spin size='small' />
							) : (
								<HiCheck size={16} />
							)}
						</button>
					)}
					<Link to={`/course-content/${_id}`}>
						<button className='text-sky-500 p-1 rounded-full border border-sky-500'>
							<HiOutlineEye size={16} />
						</button>
					</Link>
					<Link to={`edit/${_id}`}>
						<button className='text-primary p-1 rounded-full border border-primary'>
							<MdModeEditOutline size={16} />
						</button>
					</Link>
					<Popconfirm
						title='Are you sure to delete this course?'
						onConfirm={() => handleDeleteCourse(data._id)}
						okText='Yes'
						cancelText='No'
					>
						<button className='text-error p-1 rounded-full border border-error'>
							{loadingStatus?.isApproving &&
							loadingStatus.currCourse === data._id ? (
								<Spin size='small' />
							) : (
								<MdDeleteOutline size={16} />
							)}
						</button>
					</Popconfirm>
				</div>
			),
		},
	];
	return <Table columns={columns} dataSource={courses} />;
};

export default ManageCoursesTable;
