import React, { useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import LordIcon from '../../../components/layout/LordIcon/LordIcon';
import ContentCreatorCourse from './ContentCreatorCourse';
import axios from 'axios';
import { message, notification } from 'antd';
import Loading from '../../../components/layout/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Lottie from '../../../components/layout/Lottie/Lottie';
import { Link } from 'react-router-dom';

const ContentCreatorCourses = () => {
	const [myCourses, setMyCourses] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [loadingStatus, setLoadingStatus] = useState({
		isDeleting: false,
	});
	const { user } = useAuth();
	// functions - on component mount
	useEffect(() => {
		if (!myCourses.length && user?.userId) {
			setIsFetching(true);
			axios
				.get(`/courses?status=all&instructor=${user.userId}`)
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
	}, [user]);

	const handleDeleteCourse = (courseId) => {
		setLoadingStatus((prevStatus) => {
			return { isDeleting: true, currCourse: courseId };
		});
		const key = 'deleting';
		notification.info({
			key,
			message: 'Deleting course is ongoing!',
		});

		axios
			.delete(`/courses/${courseId}`)
			.then((response) => {
				setMyCourses((prevCourses) => {
					const newCourses = prevCourses.filter(
						(course) => String(course._id) !== courseId
					);
					return newCourses;
				});
				notification.success({
					key,
					message: 'Success! Course has been deleted.',
				});
			})
			.catch((error) => {
				message.error(error.message);
			})
			.finally(() => {
				setLoadingStatus((prevStatus) => {
					return {
						isDeleting: false,
						currCourse: null,
					};
				});
			});
	};

	const courseStatList = [
		{
			icon: (
				<LordIcon
					src='https://cdn.lordicon.com/jqeuwnmb.json'
					size={40}
				/>
			),
			value:
				myCourses?.filter((course) => course.status === 'active')
					.length || 0,
			title: 'Active Courses',
		},
		{
			icon: (
				<LordIcon
					src='https://cdn.lordicon.com/kvsszuvz.json'
					size={40}
				/>
			),
			value:
				myCourses?.filter((course) => course.status === 'pending')
					.length || 0,
			title: 'Pending Courses',
		},
		{
			icon: (
				<LordIcon
					src='https://cdn.lordicon.com/cmrzxpzz.json'
					size={40}
				/>
			),
			value:
				myCourses?.reduce(
					(accumulator, currentValue) =>
						currentValue?.currLearners.length + accumulator,
					0
				) || 0,
			title: 'Total Learners',
		},
		{
			icon: (
				<LordIcon
					src='https://cdn.lordicon.com/qhviklyi.json'
					size={40}
				/>
			),
			value:
				myCourses?.reduce(
					(accumulator, currentValue) =>
						currentValue?.numberOfReviews + accumulator,
					0
				) || 0,
			title: 'Reviews Placed',
		},
	];
	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Courses</h4>
				{/* add new course */}
				<Link to='add'>
					<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
						<HiPlus size={20} /> <span>Add New Course</span>
					</button>
				</Link>
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
			<div className='space-y-4'>
				<h4 className='font-medium uppercase'>Course list</h4>
				{/*****--------------Course List -> Filter Options---------------*****/}
				<div className='py-4'>
					{isFetching ? (
						<div className='h-[10vh] flex justify-center items-center'>
							<Loading />
						</div>
					) : (
						<div>
							{!Boolean(myCourses.length) && (
								<div className='p-4 flex justify-center items-center'>
									<Lottie
										src='https://assets10.lottiefiles.com/private_files/lf30_e3pteeho.json'
										size={{ width: 400, height: 400 }}
									/>
								</div>
							)}
							{Boolean(myCourses.length) && (
								<div className='space-y-4'>
									{myCourses.map((courseItem) => (
										<ContentCreatorCourse
											key={courseItem._id}
											courseItem={courseItem}
											handleDeleteCourse={
												handleDeleteCourse
											}
											loadingStatus={loadingStatus}
										/>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContentCreatorCourses;
