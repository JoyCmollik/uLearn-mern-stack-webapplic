import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import CourseContentDetail from '../../CourseContentDetailPage/CourseContentDetail/CourseContentDetail';
import CourseContentMenu from '../CourseContentMenu/CourseContentMenu';

const CourseContentTabsCourse = ({ singleContent }) => {
	return (
		<>
			<div>
				<Routes>
					<Route
						index
						element={
							<CourseContentMenu singleContent={singleContent} />
						}
					/>
					<Route
						path='lesson/:lessonId'
						element={
							<CourseContentDetail
								singleContent={singleContent}
							/>
						}
					/>
				</Routes>
			</div>{' '}
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default CourseContentTabsCourse;
