import React, { useEffect, useState } from 'react';
// library components
import { Table, Input, Spin } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
import axios from 'axios';
const { Search } = Input;

const columns = [
	{
		title: 'Profile',
		dataIndex: 'avatarURL',
		key: 'avatarURL',
		render: (img) => <img width={30} src={img} alt='img' />,
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
		dataIndex: 'joining_time',
		key: 'time',
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
				<Spin size='small' />
			)}
		</div>
	);
};

export default UserLearnerList;