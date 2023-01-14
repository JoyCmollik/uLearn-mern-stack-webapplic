import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import CourseContentDiscussionAddTopic from './CourseContentDiscussionAddTopic';
import CourseContentDiscussionList from './CourseContentDiscussionList';
import CourseContentTabsDiscussionListDetail from './CourseContentTabsDiscussionListDetail';

const CourseContentTabsDiscussion = () => {
	return (
		<div className='border-[0.5px] rounded-lg min-h-[70vh] p-4'>
			<Routes>
				<Route index element={<CourseContentDiscussionList />} />

				<Route
					path='addTopic'
					element={<CourseContentDiscussionAddTopic />}
				/>
				<Route
					path='discussionList/:discussionListId'
					element={<CourseContentTabsDiscussionListDetail />}
				/>
			</Routes>
			<Outlet />
		</div>
	);
};

export default CourseContentTabsDiscussion;
