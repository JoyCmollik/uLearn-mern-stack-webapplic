import React, { useEffect, useState } from 'react';
import moment from 'moment';
// library components
import { Table, Input, Spin } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
import axios from 'axios';
import Loading from '../../../../components/layout/Loading/Loading';
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
		title: 'joining_time',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (createdAt) => <p>{moment(createdAt).format('LL')} </p>,
	},
	// {
	// 	title: 'Action',
	// 	key: 'action',
	// 	render: () => (
	// 		<button className='text-primary px-2 py-[0.5px] rounded-lg border border-primary'>
	// 			<TfiMore size={18} />
	// 		</button>
	// 	),
	// },
];

const UsersAdminList = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get('/users?role=admin')
			.then((response) => {
				//console.log(response.data.users);
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
				{/* <div className='flex items-center space-x-2'>
					<span>Show</span>
					<span>
						<CustomSelect defaultValue='25' />
					</span>
					<span>entries</span>
				</div> */}
				{/* <Search
					placeholder='input search text'
					// onSearch={onSearch}
					enterButton
					size='large'
					style={{
						width: '25%',
					}}
				/> */}
			</div>
			{!loading ? (
				<Table columns={columns} dataSource={data} />
			) : (
				<div className='h-[40vh] flex justify-center items-center'>
					<Loading />
				</div>
			)}
		</div>
	);
};

export default UsersAdminList;
