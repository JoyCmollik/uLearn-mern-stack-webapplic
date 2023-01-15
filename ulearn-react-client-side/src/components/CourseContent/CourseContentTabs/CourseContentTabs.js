import React from 'react';
import { Tabs } from 'antd';
import './CourseContentTabs.css';

import CourseContentTabsCourse from '../CourseContentTabsCourse/CourseContentTabsCourse';
import CourseContentTabsDiscussion from '../CourseContentTabsDiscussion/CourseContentTabsDiscussion';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
const onChange = (key) => {
	console.log(key);
};

const CourseContentTabs = ({ courseContent }) => {
	return (
		<section className='space-y-2'>
			<nav className='flex justify-start items-center border-b'>
				<NavLink
					to={`/course-content/${courseContent._id}`}
					className={({ isActive }) =>
						[
							'px-4 py-2 flex items-center space-x-2 text-base hover:bg-light hover:text-font1',
							isActive
								? ' text-primary border-b-[1px] border-primary'
								: 'text-font1',
						]
							.filter(Boolean)
							.join(' ')
					}
					end
				>
					Course
				</NavLink>
				<NavLink
					to={`/course-content/${courseContent._id}/discussions`}
					className={({ isActive }) =>
						[
							'px-4 py-2 flex items-center space-x-2 text-base hover:bg-light hover:text-font1',
							isActive
								? ' text-primary border-b-[1px] border-primary'
								: 'text-font1',
						]
							.filter(Boolean)
							.join(' ')
					}
				>
					Discussion
				</NavLink>
			</nav>
			<Routes>
				<Route
					path='/*'
					element={
						<CourseContentTabsCourse
							courseContent={courseContent}
						/>
					}
				/>
				<Route
					path='discussions/*'
					element={
						<CourseContentTabsDiscussion
							courseContent={courseContent}
						/>
					}
				/>
			</Routes>
			<Outlet />
		</section>
	);
};

export default CourseContentTabs;
