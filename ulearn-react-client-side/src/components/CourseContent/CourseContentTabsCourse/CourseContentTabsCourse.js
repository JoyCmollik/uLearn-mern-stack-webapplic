import React, { useEffect, useState } from 'react';
import { Alert, Input, Spin, Tag } from 'antd';
import { Reorder } from 'framer-motion';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Section from '../../../dashboards/DashboardShared/Courses/EditCourse/Section';

import CourseContentDetail from '../../CourseContentDetailPage/CourseContentDetail/CourseContentDetail';
import CourseContentMenu from '../CourseContentMenu/CourseContentMenu';

import nodataImg from '../../../images/no_data.png';
import { MdDashboard } from 'react-icons/md';
import CourseContentLessons from './CourseContentLessons';
import CourseContentLessonPage from './CourseContentLessonPage';
import Loading from '../../layout/Loading/Loading';

const CourseContentTabsCourse = ({ courseContent }) => {
	const [sectionList, setSectionList] = useState([]);
	const [currSection, setCurrSection] = useState([]);
	const [currLesson, setCurrLesson] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// library constants
	const navigate = useNavigate();

	useEffect(() => {
		if (courseContent.sections) {
			setSectionList(courseContent.sections);
			setCurrSection(courseContent.sections[0]);
			setIsLoading(false);
		}
	}, [courseContent]);

	// functionality - will show the current section
	const handleCurrSection = (section) => {
		setCurrSection(section);
	};

	// functionality - will select the current lesson to be showed
	// const handleCurrLesson = (lesson) => {
	// 	setCurrSection(lesson);
	// };

	console.log('re-rendering contents');

	return (
		<div className='border-[0.5px] rounded-lg min-h-[70vh] grid grid-cols-12 gap-2 p-2'>
			{isLoading ? (
				<div className='col-span-12 flex justify-center items-center h-full'>
					<Loading />
				</div>
			) : (
				<>
					{/*****--------------Section container---------------*****/}
					<div className='col-span-3 bg-light rounded-lg'>
						{/*****--------------Section count add button---------------*****/}
						<div className='flex justify-between items-center p-2'>
							<h4 className='text-lg font-medium uppercase m-0'>
								Sections
							</h4>
						</div>
						{/*****--------------Section list---------------*****/}
						<div>
							{!sectionList.length ? (
								<Alert
									style={{
										borderRadius: '8px',
										margin: '0 8px',
									}}
									message='No sections available yet.'
									type='info'
									showIcon
								/>
							) : (
								<>
									<Reorder.Group
										axis='y'
										values={sectionList}
										onReorder={setSectionList}
										className='space-y-0.5'
									>
										{sectionList.map(
											(sectionItem, sectionIdx) => (
												<Reorder.Item
													key={sectionItem?._id}
													value={sectionItem}
												>
													<article
														key={sectionItem?._id}
														onClick={() => {
															handleCurrSection(
																sectionItem
															);
															navigate(
																`/course-content/${courseContent._id}`
															);
														}}
														className={`block px-2 py-2 border-l-2 bg-primary cursor-pointer bg-opacity-5 ${
															currSection._id ===
															sectionItem._id
																? 'border-l-primary'
																: 'border-l-transparent'
														}`}
													>
														<h5 className='text-lg font-light m-0'>
															Section{' '}
															{sectionIdx + 1} :{' '}
															{
																sectionItem.sectionTitle
															}
														</h5>
														<p className='m-0 text-xs font-light text-font2'>
															Total Lessons:{' '}
															{sectionItem
																?.lessons
																?.length || 0}
														</p>
													</article>
												</Reorder.Item>
											)
										)}
									</Reorder.Group>
								</>
							)}
						</div>
					</div>
					{/*****--------------Lesson container---------------*****/}
					<div className='col-span-9 bg-white rounded-lg p-2'>
						<Routes>
							<Route
								index
								element={
									<CourseContentLessons
										currSection={currSection}
									/>
								}
							/>
							<Route
								path='lesson/:lessonId'
								element={
									<CourseContentLessonPage
										currSection={currSection}
									/>
								}
							/>
						</Routes>
						<Outlet />
					</div>
				</>
			)}
		</div>
	);
};

export default CourseContentTabsCourse;
