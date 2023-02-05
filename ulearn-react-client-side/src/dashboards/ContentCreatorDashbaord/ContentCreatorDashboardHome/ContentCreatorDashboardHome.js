import { Calendar, message, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiBookReader } from 'react-icons/bi';
import { BsBookHalf } from 'react-icons/bs';
import { FaGetPocket } from 'react-icons/fa';
import { MdOutlineSchool } from 'react-icons/md';
import LordIcon from '../../../components/layout/LordIcon/LordIcon';
import useAuth from '../../../hooks/useAuth';
import CourseOverview from '../../AdminDashboard/AdminDashboardHomePage/AdminDashboardHomeComponents/CourseOverview/CourseOverview';
import TopCourses from '../../AdminDashboard/AdminDashboardHomePage/AdminDashboardHomeComponents/TopCourses/TopCourses';
import ContentCreatorPendingCourses from '../ContentCreatorCourses/ContentCreatorPendingCourses';

const ContentCreatorDashboardHome = () => {
	const [myCourses, setMyCourses] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const { user } = useAuth();
	// functions - on component mount
	useEffect(() => {
		if (!myCourses && user?.userId) {
			setIsFetching(true);
			axios
				.get(`/courses?instructor=${user.userId}`)
				.then((response) => {
					setMyCourses(response.data.courses);
				})
				.catch((error) => {
					message.error(error.message);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
	}, []);
	return (
		<div className='min-h-screen grid grid-cols-12 gap-4'>
			{/*****--------------dashboard home left panel---------------*****/}
			<div className='col-span-12 space-y-4'>
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
								{isFetching ? (
									<Spin size='small' />
								) : (
									<>{myCourses?.length || 0}</>
								)}{' '}
								Courses
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
								{isFetching ? (
									<Spin size='small' />
								) : (
									<>
										{myCourses?.reduce(
											(accumulator, currentValue) =>
												currentValue?.currLearners
													.length + accumulator,
											0
										) || 0}
									</>
								)}{' '}
								Learners
							</h2>
						</div>
					</div>
					{/*****--------------lessons count---------------*****/}
					<div className='border-l-[4px] border-l-brand1 bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-pink-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<BiBookReader className='text-brand1' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Sections</p>
							<h2 className='font-medium text-xl m-0'>
								{isFetching ? (
									<Spin size='small' />
								) : (
									<>
										{myCourses?.reduce(
											(accumulator, currentValue) =>
												currentValue?.sections.length +
												accumulator,
											0
										) || 0}
									</>
								)}{' '}
								Sections Created
							</h2>
						</div>
					</div>
					{/*****--------------reviews count---------------*****/}
					<div className='border-l-[4px] border-l-brand2 bg-white h-[10vh] w-full rounded-lg border-[0.5px] flex space-x-4 p-2 items-center'>
						<div className='bg-green-100 px-10 rounded-lg flex justify-center items-center h-full'>
							<FaGetPocket className='text-brand2' size={28} />
						</div>
						<div className='space-y-1'>
							<p className='text-font2 m-0'>Total Reviews</p>
							<h2 className='font-medium text-xl m-0'>
								{isFetching ? (
									<Spin size='small' />
								) : (
									<>
										{myCourses?.reduce(
											(accumulator, currentValue) =>
												currentValue?.numberOfReviews +
												accumulator,
											0
										) || 0}
									</>
								)}{' '}
								New Reviews
							</h2>
						</div>
					</div>
				</div>
				{/*****--------------Courses---------------*****/}
				<div className='grid grid-cols-2 gap-4'>
					<div className='bg-white w-full rounded-lg border-[0.5px]'>
						<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
							Your Pending Courses
						</h4>
						<div className='p-4'>
							<ContentCreatorPendingCourses />
						</div>
					</div>
					<div className='bg-white w-full rounded-lg border-[0.5px] space-y-4'>
						<h4 className='text-base uppercase p-4 border-b-[0.5px]'>
							Course Overview
						</h4>
						<div className='overview-wrapper h-full flex flex-col justify-start items-center'>
							<div className='flex justify-center items-center'>
								<CourseOverview
									courseStats={{
										activeCourses:
											myCourses?.filter(
												(course) =>
													course.status === 'active'
											).length || 0,
										pendingCourses:
											myCourses?.filter(
												(course) =>
													course.status === 'pending'
											).length || 0,
									}}
								/>
							</div>
							<div className='flex justify-center items-center space-x-16'>
								<div className='text-center'>
									<LordIcon
										src='https://cdn.lordicon.com/etwtznjn.json'
										size={45}
										primary='#121331'
										secondary='#1CD767'
									/>
									<h4 className='text-brand2 text-xl'>
										{myCourses?.filter(
											(course) =>
												course.status === 'active'
										).length || 0}
									</h4>
									<p className='text-font2'>Active Courses</p>
								</div>
								<div className='text-center'>
									<LordIcon
										src='https://cdn.lordicon.com/qghrdngw.json'
										size={45}
										primary='#121331'
										secondary='#FED81D'
									/>
									<h4 className='text-warning text-xl'>
										{myCourses?.filter(
											(course) =>
												course.status === 'pending'
										).length || 0}
									</h4>
									<p className='text-font2'>
										Pending Courses
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentCreatorDashboardHome;
