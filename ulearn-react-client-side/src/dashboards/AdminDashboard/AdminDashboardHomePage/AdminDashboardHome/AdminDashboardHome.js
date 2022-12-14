import React from 'react';
// components
import DashboardSidebar from '../../../DashboardLayout/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../../DashboardLayout/DashboardHeader/DashboardHeader';
import AdminRevenue from '../AdminDashboardHomeComponents/AdminRevenue/AdminRevenue';
import CourseOverview from '../AdminDashboardHomeComponents/CourseOverview/CourseOverview';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';

// third party components
import { Outlet, Route, Routes } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineSchool } from 'react-icons/md';
import { Calendar } from 'antd';
import { BsBookHalf } from 'react-icons/bs';
import { BiBookReader } from 'react-icons/bi';
import { FaGetPocket } from 'react-icons/fa';
import TopCourses from '../AdminDashboardHomeComponents/TopCourses/TopCourses';

const AdminDashboardHome = () => {
	return (
		<div className='min-h-screen grid grid-cols-12 gap-4'>
			{/*****--------------dashboard home left panel---------------*****/}
			<div className='col-span-8 space-y-4'>
				{/*****--------------total statistics---------------*****/}
				<div className='grid grid-cols-2 gap-4'>
					{/*****--------------courses count---------------*****/}
					<div className='border-l-[4px] border-l-primary bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-blue-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<BsBookHalf className='text-primary' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Courses</p>
							<h2 className='font-medium text-xl m-0'>
								40 Courses
							</h2>
						</div>
					</div>
					{/*****--------------students count---------------*****/}
					<div className='border-l-[4px] border-l-font1 bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-gray-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<MdOutlineSchool className='text-font1' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Students</p>
							<h2 className='font-medium text-xl m-0'>
								100 Learners
							</h2>
						</div>
					</div>
					{/*****--------------lessons count---------------*****/}
					<div className='border-l-[4px] border-l-brand1 bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-pink-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<BiBookReader className='text-brand1' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Lessons</p>
							<h2 className='font-medium text-xl m-0'>
								250 Lessons
							</h2>
						</div>
					</div>
					{/*****--------------enrollments count---------------*****/}
					<div className='border-l-[4px] border-l-brand2 bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-green-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<FaGetPocket className='text-brand2' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Enrollments</p>
							<h2 className='font-medium text-xl m-0'>
								40 New Students
							</h2>
						</div>
					</div>
				</div>
				{/*****--------------Admin Revenue This Year---------------*****/}
				<div className='bg-white h-[40vh] w-full rounded-lg border-[0.5px] space-y-4'>
					<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
						Admin Revenue This Year
					</h4>
					<AdminRevenue />
				</div>
				{/*****--------------Courses---------------*****/}
				<div className='grid grid-cols-2 gap-4'>
					<div className='bg-white w-full rounded-lg border-[0.5px]'>
						<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
							Pending Courses
						</h4>
						<div className='p-4'>
							<TopCourses />
						</div>
					</div>
					<div className='bg-white w-full rounded-lg border-[0.5px] space-y-4'>
						<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
							Course Overview
						</h4>
						<div className='overview-wrapper h-full flex flex-col justify-start items-center'>
							<div className='flex justify-center items-center'>
								<CourseOverview />
							</div>
							<div className='flex justify-center items-center space-x-16'>
								<div className='text-center'>
									<LordIcon
										src='https://cdn.lordicon.com/etwtznjn.json'
										size={45}
										primary='#121331'
										secondary='#1CD767'
									/>
									<h4 className='text-brand2 text-xl'>100</h4>
									<p className='text-font2'>Active Courses</p>
								</div>
								<div className='text-center'>
									<LordIcon
										src='https://cdn.lordicon.com/qghrdngw.json'
										size={45}
										primary='#121331'
										secondary='#FED81D'
									/>
									<h4 className='text-warning text-xl'>90</h4>
									<p className='text-font2'>
										Pending Courses
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*****--------------dashboard home right panel---------------*****/}
			<div className='col-span-4 space-y-4'>
				{/*****--------------calendar---------------*****/}
				<div className='bg-white h-[4ovh] w-full rounded-lg border-[0.5px] overflow-hidden'>
					<Calendar fullscreen={false} />
				</div>
				{/*****--------------Top Courses With List---------------*****/}
				<div className='bg-white w-full rounded-lg border-[0.5px]'>
					<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
						Top Courses
					</h4>
					<div className='p-4'>
						<TopCourses />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardHome;
