// import React from 'react';

// // library components
// import { Table, Tag } from 'antd';

// const columns = [
// 	{
// 		title: '#',
// 		dataIndex: '_id',
// 		key: '_id',
// 		render: (text) => <a>{text}</a>,
// 	},
// 	{
//         title: 'Coupon Code',
// 		dataIndex: 'coupon_code',
// 		key: 'coupon_code',
// 	},
// 	{
// 		title: 'Category',
// 		key: 'categories',
// 		dataIndex: 'categories',
// 		render: (_, { categories }) => (
// 			<div className='flex flex-wrap space-x-1'>
// 				{categories.map((tag) => (
// 					<Tag className='capitalize' color='gray' key={tag}>
// 						{tag}
// 					</Tag>
// 				))}
// 			</div>
// 		),
// 	},
// 	{
// 		title: 'Lesson and section',
// 		dataIndex: 'course_stat',
// 		key: 'course_stat',
// 		render: ({ sections, lessons }) => (
// 			<div className='flex flex-col space-y-1'>
// 				<small className='font-medium text-font2'>
// 					Total section: <span className='font-bold'>{sections}</span>
// 				</small>
// 				<small className='font-medium text-font2'>
// 					Total lesson: <span className='font-bold'>{lessons}</span>
// 				</small>
// 			</div>
// 		),
// 	},
// 	{
// 		title: 'Enrolled students',
// 		dataIndex: 'total_enrollment',
// 		key: 'total_enrollment',
// 		render: (enrollment) => (
// 			<small className='font-medium text-font2'>
// 				Total Enrollment:{' '}
// 				<span className='font-bold'>{enrollment}</span>
// 			</small>
// 		),
// 	},
// 	{
// 		title: 'Status',
// 		key: 'status',
// 		dataIndex: 'status',
// 		render: (status) => {
// 			let color = status === 'active' ? 'green' : 'red';
// 			return (
// 				<Tag size='small' color={color} key={status}>
// 					{status.toUpperCase()}
// 				</Tag>
// 			);
// 		},
// 	},
// 	{
// 		title: 'Price',
// 		dataIndex: 'price',
// 		key: 'price',
// 		render: (price) => (
// 			<p className='text-font2 m-0'>
// 				<span className='font-medium text-font1'>
// 					{price ? '$' : null}
// 				</span>
// 				{price || price !== 0 ? price : <Tag color='purple'>free</Tag>}
// 			</p>
// 		),
// 	},
// 	{
// 		title: 'Action',
// 		key: 'action',
// 		render: () => (
// 			<button className='text-primary px-2 py-[0.5px] rounded-lg border border-primary'>
// 				<TfiMore size={18} />
// 			</button>
// 		),
// 	},
// ];

// const CouponsList = () => {
//   return (
//     <div>CouponsList</div>
//   )
// }

// export default CouponsList