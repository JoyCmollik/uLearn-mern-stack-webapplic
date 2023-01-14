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
			{/* <Tabs
				className='course-content-Tab-style course-content-active-color course-content-tabs-ink-bar course-content-tabs-btn course-content-tabs-nav-wrap course-content-tabs-tab'
				defaultActiveKey='1'
				onChange={onChange}
				items={[
					{
						label: <h4 className='text-base'>Course</h4>,
						key: '1',
						children: (
							<div>
								<CourseContentTabsCourse
									courseContent={courseContent}
								/>
							</div>
						),
					},
					{
						label: <h4 className='text-base'>Discussion</h4>,
						key: '2',
						children: (
							<div>
								<CourseContentTabsDiscussion />
							</div>
						),
					},
				]}
			/> */}
			<nav className='flex justify-start items-center border-b'>
				<NavLink
					to={`/course-content/${courseContent._id}`}
					className={({ isActive }) =>
						[
							'px-4 py-2 flex items-center space-x-2 text-base hover:bg-light hover:text-font1',
							isActive
								? ' text-primary border-b-[2px] border-primary'
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
								? ' text-primary border-b-[2px] border-primary'
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
					element={<CourseContentTabsDiscussion />}
				/>
			</Routes>
			<Outlet />
		</section>
	);
};

export default CourseContentTabs;
