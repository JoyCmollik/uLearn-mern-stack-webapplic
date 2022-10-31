import React from 'react';
// library components
import { Space, Table, Tag } from 'antd';

const columns = [
	{
		title: 'Course',
		dataIndex: 'course',
		key: 'course',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Creators Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
	},
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		price: 32,
		total: 3,
        course: 'Learn Computer Organization Architecture',
	},
	{
		key: '2',
		name: 'Jim Green',
		price: 42,
		total: 4,
        course: 'Learn Computer Organization Architecture',
	},
	{
		key: '3',
		name: 'Joe Black',
		price: 32,
		total: 3,
        course: 'Learn Computer Organization Architecture',
	},
];

const TopCourses = () => {
  return <Table columns={columns} dataSource={data} />;
}

export default TopCourses