import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import CourseContentDiscussionAddTopic from './CourseContentDiscussionAddTopic';
import CourseContentDiscussionList from './CourseContentDiscussionList';
import CourseContentTabsDiscussionListDetail from './CourseContentTabsDiscussionListDetail';

const CourseContentTabsDiscussion = ({ courseContent }) => {
	const [courseTopics, setCourseTopics] = useState([]);
	const [isLoading, setIsLoading] = useState();
	const [triggerFetching, setTriggerFetching] = useState(true);
	// const navigate = useNavigate();

	// function - on component mount
	useEffect(() => {
		if (courseContent || triggerFetching) {
			setIsLoading(true);
			axios
				.get(`/topics/course/${courseContent._id}`)
				.then((response) => {
					console.log(response.data.topics);
					setCourseTopics(response.data.topics);
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
					setTriggerFetching(false);
				});
		}
	}, [courseContent, triggerFetching]);

	// function - create a topic
	const handleCreateTopic = (topicTitle, topicContent) => {
		if (!topicTitle || !topicContent) {
			message.warning('Input both title and topic body to post.');
			return;
		}
		setIsLoading(true);
		const topic = { topicTitle, topicContent, course: courseContent._id };
		axios
			.post('/topics', { ...topic })
			.then((response) => {
				console.log(response.data.topic);
				message.success('Topic is added successfully');
				window.history.back();
				setTriggerFetching(true);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className='border-[0.5px] rounded-lg min-h-[70vh] p-4'>
			<Routes>
				<Route
					index
					element={
						<CourseContentDiscussionList
							courseTopics={courseTopics}
							isLoading={isLoading}
						/>
					}
				/>

				<Route
					path='addTopic'
					element={
						<CourseContentDiscussionAddTopic
							handleCreateTopic={handleCreateTopic}
							isLoading={isLoading}
						/>
					}
				/>
				<Route
					path='topics/:topicId'
					element={<CourseContentTabsDiscussionListDetail />}
				/>
			</Routes>
			<Outlet />
		</div>
	);
};

export default CourseContentTabsDiscussion;
