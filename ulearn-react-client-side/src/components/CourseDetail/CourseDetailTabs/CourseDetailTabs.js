import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import { AiOutlineClockCircle, AiOutlineReconciliation } from 'react-icons/ai';
import {
	BsCheck,
	BsFillBarChartLineFill,
	BsHeart,
	BsPeople,
	BsPlayCircleFill,
	BsShare,
} from 'react-icons/bs';
import {
	MdOutlineAssignment,
	MdOutlineAssignmentReturned,
	MdOutlineQuiz,
} from 'react-icons/md';

import './CourseDetailTabs.css';
import CourseDetailCollapse from '../CourseDetailCollapse/CourseDetailCollapse';

import CourseDetailReview from '../CourseDetailReview/CourseDetailReview';
import CourseDetailInstructor from '../CourseDetailInstructor/CourseDetailInstructor';
import { TbCertificate2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const parse = require('html-react-parser');

//tabs
const onChange = (key) => {
	console.log(key);
};

const courseIncludes = [
	{
		id: 61,
		icon: <MdOutlineAssignment />,
		courseinfo: '21 min 42 sec Read',
	},
];
const CourseDetailTabs = ({ singleCourse }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const {
		courseTitle,
		courseDesc,
		courseMetaDesc,
		courseShortDesc,
		courseOutcomes,
		enrolledStudents,
		courseRequirements,
		level,
		language,
		sections,
		courseOverviewVidUrl,
		instructor,
		courseThumb,
	} = singleCourse;

	const enrollDetails = [
		{
			id: 45,
			icon: <AiOutlineClockCircle />,
			title1: 'Course Duration',
			title2: '21 min 42 sec',
		},
		{
			id: 46,
			icon: <BsFillBarChartLineFill />,
			title1: 'Course level',
			title2: level ? level : '',
		},
		{
			id: 48,
			icon: <AiOutlineReconciliation />,
			title1: 'Language',
			title2: language ? language : '',
		},
	];

	return (
		<section className='container mx-auto    '>
			<div className='grid grid-cols-12  gap-12'>
				{/*-----------------------tabs--------------------------*/}
				<div className='col-span-8 border -mt-8 bg-white rounded'>
					<Tabs
						className='courseTabStyle course-detail-active-color course-detail-tabs-ink-bar course-detail-tabs-btn course-detail-tabs-nav-wrap course-detail-tabs-tab'
						defaultActiveKey='1'
						onChange={onChange}
						items={[
							{
								label: `Overview`,
								key: '1',
								children: (
									<article className='py-10 pl-10'>
										<h2 className='capitalize text-[33px] pb-5'>
											What you will learn
										</h2>
										<div className='grid grid-cols-2 gap-4'>
											<ul className='flex flex-col space-y-4'>
												{courseOutcomes
													? courseOutcomes
															?.slice(0, 4)
															.map(
																(
																	text,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className='flex items-center space-x-3  whitespace-pre-line'
																	>
																		<span className='block bg-green-200 rounded-full p-1 '>
																			<BsCheck className='text-base text-green-500  ' />{' '}
																		</span>
																		<span className='block text-base'>
																			{
																				text
																			}
																		</span>
																	</li>
																)
															)
													: ''}
											</ul>

											<ul className='flex flex-col space-y-4'>
												{courseOutcomes?.length > 4
													? courseOutcomes
															?.slice(4, 8)
															.map(
																(
																	text,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className='flex items-center space-x-3  whitespace-pre-line'
																	>
																		<span className='block bg-green-200 rounded-full p-1 '>
																			<BsCheck className='text-base text-green-500  ' />{' '}
																		</span>
																		<span className='block text-base'>
																			{
																				text
																			}
																		</span>
																	</li>
																)
															)
													: ''}
											</ul>
										</div>
										<p className='text-base'>
											{courseDesc
												? parse(courseDesc)
												: ''}
										</p>
									</article>
								),
							},
							{
								label: `Curriculum`,
								key: '2',
								children: (
									<div>
										<CourseDetailCollapse
											sections={sections}
										/>
									</div>
								),
							},

							{
								label: `Review`,
								key: '4',
								children: (
									<div>
										<CourseDetailReview
											singleCourse={singleCourse}
										/>
									</div>
								),
							},
							{
								label: `Instructor`,
								key: '5',
								children: (
									<div>
										<CourseDetailInstructor
											instructor={instructor}
										/>
									</div>
								),
							},
						]}
					/>
				</div>
				{/*----------------------------enroll course detail--------------------------------*/}
				<div className='col-span-4 border  rounded p-4 bg-white -mt-96 '>
					<div className='relative'>
						<img
							src={courseThumb}
							alt=''
							className='object-cover w-full'
						/>
						<div className='absolute top-32 left-48'>
							<BsPlayCircleFill
								onClick={showModal}
								className='text-[#5E3FD7] text-6xl font-medium capitalize bg-white rounded-full '
							/>
							{/* <button
								
							>
								preview
							</button> */}
							<Modal
								title='...'
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								className='course-detail-modal-footer course-detail-modal-header course-detail-modal-close course-detail-modal-content course-detail-modal-body'
							>
								<iframe
									width='560px'
									height='315px'
									src={courseOverviewVidUrl}
									title={courseTitle}
								></iframe>
							</Modal>
						</div>
						{/* -------------------------------cost-------------------------------
						<h3 className='text-[33px]  text-[#040453] font-medium pt-4'>
							$ {coursePrice || ''}
						</h3> */}
						<div>
							{enrollDetails.map((detail) => (
								<div
									key={detail.id}
									className='flex items-center justify-between space-y-3'
								>
									<div className='flex justify-between items-center text-base'>
										{detail.icon}
										<span className='block text-base  text-font1 ml-3 '>
											{detail.title1}
										</span>
									</div>
									<span className='block text-base  text-font1 '>
										{detail.title2}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='pt-4'>
						<Link to={`/course-content/${singleCourse._id}`}>
							<button className='block py-3 rounded-lg bg-[#5E3FD7] text-white text-center w-full text-base'>
								Go to course content
							</button>
						</Link>
						{/* <div className='grid grid-cols-2 gap-4 pt-4 px-4'>
							<button className='block py-2 rounded text-[15px] border-2 border-font2 font-medium'>
								<BsHeart className='mr-3 inline' /> Add To
								Wishlist
							</button>
							<button className='block py-2  rounded  text-[15px]  border-2 border-font2 font-medium'>
								<BsShare className='mr-3 inline' /> Share Course
							</button>
						</div> */}
					</div>
					{/*--------------------------course includes----------------------------*/}
					<div className='pt-10'>
						<h2 className='capitalize text-[21px] font-medium text-[#040453]'>
							This course includes
						</h2>
						<div>
							{courseIncludes.map((course) => (
								<p
									key={course.id}
									className='flex items-center text-base space-x-3 '
								>
									{course.icon}
									<span>{course.courseinfo}</span>
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseDetailTabs;
