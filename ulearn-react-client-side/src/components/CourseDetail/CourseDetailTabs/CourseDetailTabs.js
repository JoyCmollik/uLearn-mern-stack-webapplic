import React, { useState } from 'react';
import { Modal, Spin, Tabs } from 'antd';
import {
	AiOutlineClockCircle,
	AiOutlineReconciliation,
	AiOutlineUsergroupAdd,
} from 'react-icons/ai';

import {
	BsCalendarDate,
	BsCheck,
	BsFillBarChartLineFill,
	BsPlayCircleFill,
	BsShare,
} from 'react-icons/bs';

import './CourseDetailTabs.css';
import CourseDetailCollapse from '../CourseDetailCollapse/CourseDetailCollapse';

import CourseDetailReview from '../CourseDetailReview/CourseDetailReview';
import CourseDetailInstructor from '../CourseDetailInstructor/CourseDetailInstructor';
import { VscDiffAdded } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';

const parse = require('html-react-parser');

//tabs
const onChange = (key) => {
	console.log(key);
};

const CourseDetailTabs = ({
	singleCourse,
	handleEnrollCourse,
	isEnrolling,
	setTriggerFetch,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user } = useAuth();
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
		courseOutcomes,
		enrolledStudents,
		courseRequirements,
		level,
		language,
		sections,
		courseOverviewVidUrl,
		instructor,
		createdAt,
		courseThumb,
		currLearners,
	} = singleCourse;

	const courseDetails = [
		{
			icon: <AiOutlineClockCircle className='text-font2 text-lg' />,
			title1: 'Course Duration',
			title2: '21 min 42 sec',
		},
		{
			icon: <BsFillBarChartLineFill className='text-font2 text-lg' />,
			title1: 'Course level',
			title2: level ? level : '',
		},
		{
			icon: <AiOutlineUsergroupAdd className='text-font2 text-lg' />,
			title1: 'Students',
			title2: enrolledStudents ? enrolledStudents?.length : '',
		},
		{
			icon: <AiOutlineReconciliation className='text-font2 text-lg' />,
			title1: 'Language',
			title2: language ? language : '',
		},
		{
			icon: <BsCalendarDate className='text-font2 text-lg' />,
			title1: 'Created Date',
			title2: createdAt ? moment(createdAt).fromNow() : '',
		},
	];

	return (
		<section className='container mx-auto mb-20'>
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
									<section className='space-y-4 p-6 '>
										<article>
											<h2 className='capitalize text-2xl text-primary font-bold'>
												What you will learn
											</h2>
											<div className='grid grid-cols-2 gap-4'>
												<ul className='flex flex-col space-y-2'>
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
																			<BsCheck className='text-2xl text-primary   ' />{' '}
																			<span className='block text-lg text-gray-500'>
																				{
																					text
																				}
																			</span>
																		</li>
																	)
																)
														: ''}
												</ul>

												<ul className='flex flex-col space-y-2'>
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
																				<BsCheck className='text-2xl text-green-500  ' />{' '}
																			</span>
																			<span className='block text-lg text-gray-500'>
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
										</article>
										{/* about the course */}
										<article>
											<h2 className='capitalize text-2xl font-bold text-primary'>
												About this Course
											</h2>

											<div className='text-lg text-gray-500'>
												{courseDesc
													? parse(courseDesc)
													: ''}
											</div>
										</article>
										{/* requirement */}
										<article>
											<h2 className='capitalize text-2xl font-bold text-primary'>
												Requirements
											</h2>
											<ul className='flex flex-col space-y-2'>
												{courseRequirements?.length &&
													courseRequirements.map(
														(text, index) => (
															<li
																key={index}
																className='flex items-center space-x-3  whitespace-pre-line'
															>
																<BsCheck className='text-2xl text-primary   ' />{' '}
																<span className='block text-lg text-gray-500'>
																	{text}
																</span>
															</li>
														)
													)}
											</ul>
										</article>
									</section>
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
											setTriggerFetch={setTriggerFetch}
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
				<div className='col-span-4 rounded-t-xl shadow-xl space-y-4  w-[400px]  -mt-[350px] p-4 border  bg-white'>
					<div className='relative '>
						<div className=''>
							<img
								src={courseThumb}
								alt=''
								className='object-cover  w-[400px] h-[350px] rounded-t-xl '
							/>
						</div>
						<div className='absolute top-32 left-40'>
							<BsPlayCircleFill
								onClick={showModal}
								className='text-primary text-6xl font-medium capitalize bg-white rounded-full '
							/>

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
					</div>

					<div className='space-y-4'>
						<div>
							{/* ------------------ Enroll Button ------------------ */}

							{user && currLearners && (
								<button
									onClick={() =>
										handleEnrollCourse(singleCourse._id)
									}
									disabled={currLearners?.includes(
										user?.userId
									)}
									className='block py-3 rounded-lg bg-primary text-white text-center w-full text-base disabled:bg-opacity-70'
								>
									{isEnrolling ? (
										<>
											<Spin
												className='mr-2'
												size='small'
											/>
											Enrolling on progress
										</>
									) : (
										<>
											{!currLearners?.includes(
												user?.userId
											)
												? 'Enroll to this course.'
												: 'Already enrolled to this course.'}
										</>
									)}
								</button>
							)}
						</div>
						<div className='grid grid-cols-2  border border-gray-300  rounded text-base  pt-4'>
							<button className='rounded  flex flex-col justify-center items-center border-r border-gray-300'>
								<VscDiffAdded className='text-font2' />
								<p className='text-font2'> Add To Wishlist</p>
							</button>
							<button className='flex flex-col justify-center rounded items-center '>
								<BsShare className='text-font2' />
								<p className='text-font2'> Share Course</p>
							</button>
						</div>
					</div>
					{/*--------------------------course includes----------------------------*/}
					<div className=''>
						<h2 className='capitalize text-[21px] font-medium text-primary'>
							Course Specifications
						</h2>
						<div>
							{courseDetails.map((detail, index) => (
								<div
									key={index}
									className='flex items-center justify-between space-y-3'
								>
									<div className='flex justify-between items-center text-base'>
										{detail?.icon}
										<span className='block text-lg  text-font2 ml-3 '>
											{detail?.title1}
										</span>
									</div>
									<span className='block text-lgclassName="text-font2 text-lg"  text-font2 '>
										{detail?.title2}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseDetailTabs;
