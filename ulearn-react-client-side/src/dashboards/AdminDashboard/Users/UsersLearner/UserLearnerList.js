import React, { useEffect, useState } from 'react';
import moment from 'moment';
// library components
import { Table, Input, Spin, Tag, Popconfirm } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
import axios from 'axios';
import Loading from '../../../../components/layout/Loading/Loading';
import { HiCheck } from 'react-icons/hi2';
import { MdDeleteOutline } from 'react-icons/md';
const { Search } = Input;

const columns = [
	{
		title: 'Profile',
		dataIndex: 'avatarURL',
		key: 'avatarURL',
		render: (img) => (
			<img
				className='w-10 h-10 rounded-full object-cover'
				src={img}
				alt='img'
			/>
		),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Joined On',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (createdAt) => <p>{moment(createdAt).format('LL')} </p>,
	},
	{
		title: 'Status',
		dataIndex: 'isVerified',
		key: 'isVerified',
		render: (isVerified) => (
			<Tag color={isVerified ? 'green' : 'red'}>
				{isVerified ? 'Verified' : 'Not Verified'}{' '}
			</Tag>
		),
	},
	{
		title: 'Action',
		key: 'action',
		dataIndex: '_id',
		render: (_id, data) => (
			<div className='flex items-center space-x-2 text-font2'>
				<button
					// onClick={() => handleApproveCourse(data)}
					className='text-green-400 p-1 rounded-full border border-green-400'
					// disabled={loadingStatus?.isApproving}
				>
					{/* {loadingStatus?.isApproving &&
				loadingStatus.currCourse === data._id ? (
					<Spin size='small' />
				) : (
					<HiCheck size={16} />
				)} */}
					<HiCheck size={16} />
				</button>
				<Popconfirm
					title='Are you sure to delete this course?'
					// onConfirm={() => handleDeleteCourse(data._id)}
					okText='Yes'
					cancelText='No'
				>
					<button className='text-error p-1 rounded-full border border-error'>
						{/* {loadingStatus?.isDeleting &&
						loadingStatus.currCourse === data._id ? (
							<LoadingOutlined
								style={{
									fontSize: 18,
								}}
								spin
							/>
						) : (
							<MdDeleteOutline size={18} />
						)} */}
						<MdDeleteOutline size={18} />
					</button>
				</Popconfirm>
			</div>
		),
	},
];
const UserLearnerList = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get('/users?role=user')
			.then((response) => {
				//	console.log(response.data.users);
				setData(response.data.users);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<div className='space-y-8'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-2'>
					<span>Show</span>
					<span>
						<CustomSelect defaultValue='25' />
					</span>
					<span>entries</span>
				</div>
				<Search
					placeholder='input search text'
					// onSearch={onSearch}
					enterButton
					size='large'
					style={{
						width: '25%',
					}}
				/>
			</div>
			{!loading ? (
				<Table columns={columns} dataSource={data} />
			) : (
				<Loading />
			)}
		</div>
	);
};

export default UserLearnerList;
