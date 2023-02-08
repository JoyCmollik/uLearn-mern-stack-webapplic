import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CourseContentDiscussionAddTopic from './CourseContentDiscussionAddTopic';
import CourseContentDiscussionList from './CourseContentDiscussionList';
import CourseContentDiscussionUpdateTopic from './CourseContentDiscussionUpdateTopic';
import CourseContentTabsDiscussionListDetail from './CourseContentTabsDiscussionListDetail';

const CourseContentTabsDiscussion = ({ courseContent }) => {
	const [courseTopics, setCourseTopics] = useState([]);
	const [isLoading, setIsLoading] = useState();
	const [triggerFetching, setTriggerFetching] = useState(true);
	const [voteStatus, setVoteStatus] = useState({
		upvoted: false,
		downvoted: false,
	});
	// const navigate = useNavigate();
	const { user: currUser } = useAuth();
	const navigate = useNavigate();

	// function - on component mount
	useEffect(() => {
		if (courseContent._id && triggerFetching) {
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

	// function - update a topic
	const handleUpdateTopic = (topic) => {
		setIsLoading(true);
		axios
			.patch(`/topics/${topic?._id}`, topic)
			.then((response) => {
				message.success('Topic has been updated.');
				navigate(
					`/course-content/${topic?.course}/discussions/topics/${topic._id}`
				);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// function - delete a topic
	const handleDeleteTopic = (topicId) => {
		setIsLoading(true);
		axios
			.delete(`/topics/${topicId}`)
			.then((response) => {
				message.success('Topic has been deleted.');
				navigate(`/course-content/${courseContent?._id}/discussions`);
				setCourseTopics((courseTopics) =>
					courseTopics.filter(
						(courseTopic) => courseTopic?._id !== topicId
					)
				);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// function - manipulate the number of vote for a single post locally
	const handleVoteForTopic = (operation, topicId) => {
		setCourseTopics((prevTopics) => {
			// getting the desired topic
			let targetTopic = prevTopics.find((topic) => topic._id === topicId);
			// if upvote: add userId to voteList, else remove it by filtering
			if (operation === 'upvote') {
				if (targetTopic.votes.length === 0)
					targetTopic.votes = [currUser?.userId];
				else if (!targetTopic.votes.includes(currUser?.userId))
					targetTopic.votes = [
						...targetTopic.votes,
						currUser?.userId,
					];
			} else {
				targetTopic.votes = [
					...targetTopic.votes.filter(
						(voteId) => voteId != currUser.userId
					),
				];
			}
			console.log('targetTopic', targetTopic);
			// now update the topics with new target topic keeping the order same
			let newList = prevTopics.map((topic) => {
				if (topic._id === topicId) return targetTopic;
				return topic;
			});
			return newList;
		});
	};

	// function - create a topic
	const handleUpVote = (topicId) => {
		axios
			.patch('/topics/upvote', { topicId })
			.then((response) => {
				message.success(response.data.msg);
				handleVoteForTopic('upvote', topicId);
				setVoteStatus((prevStatus) => {
					return { ...prevStatus, upvoted: true };
				});
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				// setIsLoading(false);
			});
	};

	// function - create a topic
	const handleDownVote = (topicId) => {
		axios
			.patch('/topics/downvote', { topicId })
			.then((response) => {
				message.success(response.data.msg);
				handleVoteForTopic('downvote', topicId);
				setVoteStatus((prevStatus) => {
					return { ...prevStatus, downvoted: true };
				});
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				// setIsLoading(false);
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
							vote={{ handleUpVote, handleDownVote }}
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
					path='editTopic/:topicId'
					element={
						<CourseContentDiscussionUpdateTopic
							handleUpdateTopic={handleUpdateTopic}
							isLoading={isLoading}
						/>
					}
				/>
				<Route
					path='topics/:topicId'
					element={
						<CourseContentTabsDiscussionListDetail
							handleDeleteTopic={handleDeleteTopic}
							vote={{
								handleUpVote,
								handleDownVote,
								voteStatus,
								setVoteStatus,
							}}
						/>
					}
				/>
			</Routes>
			<Outlet />
		</div>
	);
};

export default CourseContentTabsDiscussion;
