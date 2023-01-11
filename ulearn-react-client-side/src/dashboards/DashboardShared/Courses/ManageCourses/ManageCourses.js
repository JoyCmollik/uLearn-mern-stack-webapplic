import React, { useEffect, useState } from 'react';

// components import
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
// icon imports
import { HiPlus } from 'react-icons/hi2';
import { Input, message, Space, Spin } from 'antd';
import ManageCoursesTable from '../MangeCoursesTable/ManageCoursesTable';
import axios from 'axios';
const { Search } = Input;

const courseStatList = [
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/jqeuwnmb.json' size={40} />
		),
		value: 14,
		title: 'Active Courses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/kvsszuvz.json' size={40} />
		),
		value: 14,
		title: 'Pending Courses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/cmrzxpzz.json' size={40} />
		),
		value: 14,
		title: 'Free Courses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/qhviklyi.json' size={40} />
		),
		value: 14,
		title: 'Paid Courses',
	},
];

const ManageCourses = () => {
	const [courses, setCourses] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	// library constants


	// functions - on component mount
	useEffect(() => {
		setIsFetching(true);
		axios.get('/courses').then(response => {
			setCourses(response.data.courses)
		}).catch(error => {
			message.error(error.message);
		}).finally(() => {
			setIsFetching(false);
		})
	}, [])

	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Courses</h4>
				{/* add new course */}
				<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
					<HiPlus size={20} /> <span>Add New Course</span>
				</button>
			</div>
			{/*****--------------Course Stats---------------*****/}
			<div className='grid grid-cols-4 gap-4'>
				{courseStatList.map(({ icon, title, value }, statIdx) => (
					<>
						<div
							key={statIdx}
							className='flex flex-col justify-between items-center space-y-2 border-[0.5px] rounded-lg p-4 drop-shadow-lg'
						>
							{icon}
							<h4 className='text-2xl font-medium '>{value}</h4>
							<p className='text-font2'>{title}</p>
						</div>
					</>
				))}
			</div>
			{/*****--------------Course List---------------*****/}
			<div className='space-y-8'>
				<h4 className='font-medium uppercase'>Course list</h4>
				{/*****--------------Course List -> Filter Options---------------*****/}
				<div className='course-list-option-container grid grid-cols-5 gap-4'>
					{/*****--------------Filter Options -> Option---------------*****/}
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Categories</h5>
						<CustomSelect placeholder='select a category' />
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Status</h5>
						<CustomSelect placeholder='select status' />
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>
							Content Writer
						</h5>
						<CustomSelect placeholder='select content writer' />
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Price</h5>
						<CustomSelect placeholder='select price' />
					</div>
					<button
						disabled={Boolean(!courses)}
						className='px-4 h-[40px] rounded-lg bg-secondary text-white self-end disabled:bg-opacity-25'
					>
						Filter
					</button>
				</div>
			</div>
			{/*****--------------Courses Table---------------*****/}
			<div className='space-y-8'>
				{/*****--------------Search && Show Entries ---------------*****/}
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

				{/*****--------------Courses Table---------------*****/}
				<div className=''>
					{isFetching ? (
						<div className='flex h-100 justify-center items-center'>
							<Spin />
						</div>
					) : (
						<>
							{!courses ? (
								'no data'
							) : (
								<ManageCoursesTable courses={courses} />
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageCourses;
