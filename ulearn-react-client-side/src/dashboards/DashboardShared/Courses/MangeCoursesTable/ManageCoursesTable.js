import React from 'react';

// library components
import { Table, Tag } from 'antd';
import { TfiMore } from 'react-icons/tfi';

const columns = [
	{
		title: '#',
		dataIndex: '_id',
		key: '_id',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: 'Category',
		key: 'categories',
		dataIndex: 'categories',
		render: (_, { categories }) => (
			<div className='flex flex-wrap space-x-1'>
				{categories.map((tag) => (
					<Tag className='capitalize' color='gray' key={tag}>
						{tag}
					</Tag>
				))}
			</div>
		),
	},
	{
		title: 'Lesson and section',
		dataIndex: 'course_stat',
		key: 'course_stat',
		render: ({ sections, lessons }) => (
			<div className='flex flex-col space-y-1'>
				<small className='font-medium text-font2'>
					Total section: <span className='font-bold'>{sections}</span>
				</small>
				<small className='font-medium text-font2'>
					Total lesson: <span className='font-bold'>{lessons}</span>
				</small>
			</div>
		),
	},
	{
		title: 'Enrolled students',
		dataIndex: 'total_enrollment',
		key: 'total_enrollment',
		render: (enrollment) => (
			<small className='font-medium text-font2'>
				Total Enrollment:{' '}
				<span className='font-bold'>{enrollment}</span>
			</small>
		),
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: (status) => {
			let color = status === 'active' ? 'green' : 'red';
			return (
				<Tag size='small' color={color} key={status}>
					{status.toUpperCase()}
				</Tag>
			);
		},
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		render: (price) => (
			<p className='text-font2 m-0'>
				<span className='font-medium text-font1'>
					{price ? '$' : null}
				</span>
				{price || price !== 0 ? price : <Tag color='purple'>free</Tag>}
			</p>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: () => (
			<button className='text-primary px-2 py-[0.5px] rounded-lg border border-primary'>
				<TfiMore size={18} />
			</button>
		),
	},
];
const data = [
	{
		_id: '1',
		title: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		categories: ['computer science', 'graphics'],
		course_stat: { sections: 14, lessons: 20 },
		total_enrollment: 100,
		status: 'active',
		price: 0,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
	{
		_id: '2',
		title: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		categories: ['loser'],
		course_stat: { sections: 25, lessons: 100 },
		total_enrollment: 100,
		status: 'inactive',
		price: 250,
	},
];

const ManageCoursesTable = () => {
	return <Table columns={columns} dataSource={data} />;
};

export default ManageCoursesTable;
