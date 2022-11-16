import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseContentDiscussionAddTopic from './CourseContentDiscussionAddTopic';
import CourseContentDiscussionList from './CourseContentDiscussionList';

const CourseContentTabsDiscussion = () => {
	return (
		<div>
			<Routes>
				<Route index element={<CourseContentDiscussionList />} />
				<Route
					path='addTopic'
					element={<CourseContentDiscussionAddTopic />}
				/>
			</Routes>
		</div>
	);
};

export default CourseContentTabsDiscussion;
