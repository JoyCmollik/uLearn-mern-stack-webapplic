import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseContentDiscussionAddTopic from './CourseContentDiscussionAddTopic';
import CourseContentDiscussionList from './CourseContentDiscussionList';
import CourseContentTabsDiscussionListDetail from './CourseContentTabsDiscussionListDetail';

const CourseContentTabsDiscussion = () => {
	return (
		<div>
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
		</div>
	);
};

export default CourseContentTabsDiscussion;
