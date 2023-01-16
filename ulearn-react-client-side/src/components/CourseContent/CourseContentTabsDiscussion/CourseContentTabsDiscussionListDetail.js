import { Avatar, message, Progress, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './CourseContentTabDiscussionListDetail.css';
import { Dropdown, Menu } from 'antd';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
import axios from 'axios';
import { MdOutlineArrowBack } from 'react-icons/md';
import moment from 'moment';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import CourseDiscussionCommentsComponent from './CourseDiscussionComments/CourseDiscussionCommentsComponent';

const parse = require('html-react-parser');

const initialStatus = {
	deleting: { _id: null, currStatus: false },
	creating: false,
	updating: false,
};

const CourseContentTabsDiscussionListDetail = () => {
	const [topic, setTopic] = useState(null);
	const [editorContent, setEditorContent] = useState();
	const [isLoading, setIsLoading] = useState();
	const [isOperating, setIsOperating] = useState();
	const [status, setStatus] = useState({ ...initialStatus });
	const [triggerFetching, setTriggerFetching] = useState(true);

	// library constants
	const { topicId } = useParams();
	const navigate = useNavigate();

	// function - on component load
	useEffect(() => {
		if (topicId && triggerFetching) {
			setIsLoading(true);
			axios
				.get(`/topics/${topicId}`)
				.then((response) => {
					setTopic(response.data.topic);
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
	}, [topicId, triggerFetching]);

	// function - create a comment
	const handleCreateComment = (commentBody) => {
		if (!commentBody.length) {
			message.warning('Comment body can"t be empty.');
			return;
		}
		setStatus({ ...status, creating: true });
		const comment = { commentBody, topic: topicId };
		axios
			.post('/comments', { ...comment })
			.then((response) => {
				console.log(response.data.comment);
				message.success('Comment is added successfully');
				setTriggerFetching(true);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setStatus({ ...status, creating: false });
			});
	};

	// function - create a comment
	const handleDeleteComment = (commentId) => {
		setStatus({
			...status,
			deleting: { _id: commentId, currStatus: true },
		});
		axios
			.delete(`/comments/${commentId}`)
			.then((response) => {
				message.success('Comment is deleted successfully');
				setTriggerFetching(true);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setStatus({
					...status,
					deleting: { _id: null, currStatus: false },
				});
			});
	};

	return (
		<div className='relative space-y-2'>
			{/*--------------back---------------------*/}
			<div className='flex justify-end pb-2 sticky top-[100px] z-50'>
				<button
					onClick={() => window.history.back()}
					className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize sticky top-[140px] bg-white'
				>
					<MdOutlineArrowBack size={20} /> <span>Go Back</span>
				</button>
			</div>
			{isLoading ? (
				<div className='h-[40vh] flex justify-center items-center'>
					{' '}
					<Spin size='large' />{' '}
				</div>
			) : (
				<>
					{topic && (
						<div className='space-y-4'>
							{/*-------------------------------- main topic -------------------------------*/}
							<div className='grid grid-cols-12 border-y p-4'>
								{/*---------------------topic author ----------------------------*/}
								<article className='py-8 col-span-2 flex flex-col justify-start items-center space-y-2 bg-light rounded-lg'>
									<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
										<Avatar
											size={55}
											src={topic?.user?.avatarURL}
											alt={topic?.user.name}
										/>
									</div>

									<div className='text-font2 space-y-1 text-center'>
										<p className='m-0 p-0 font-semibold'>
											{topic?.user?.name}
										</p>
										<p className='m-0 px-4 py-1 text-sm font-light border rounded-lg'>
											{topic?.user?.role}
											{/* {moment(topic.createdAt).fromNow()} */}
										</p>
									</div>
								</article>
								{/*---------------------topic body posted----------------------------*/}
								<article className='col-span-10 p-4 flex flex-col space-y-2'>
									{/*---------------------topic title & vote ----------------------------*/}
									<div className='flex items-center justify-between'>
										{/*---------------------topic title ----------------------------*/}
										<div className=''>
											<h2 className='font-bold text-lg text-font1 p-0 m-0'>
												{topic.topicTitle}
											</h2>
											<p className='m-0 p-0 text-sm text-font2'>
												Posted{' '}
												{moment(
													topic?.createdAt
												).fromNow()}
											</p>
										</div>
										{/*---------------------topic vote ----------------------------*/}
										<div className='border border-font2 rounded-lg flex text-sm text-font1 overflow-hidden'>
											<button className='block px-2 border-r border-font2'>
												<BiUpArrow />
											</button>
											<div className='text-base font-medium px-2'>
												1
											</div>
											<button className=' block px-2 border-l border-font2'>
												<BiDownArrow />
											</button>
										</div>
									</div>
									{/*---------------------topic content ----------------------------*/}
									<div>
										{topic.topicContent
											? parse(topic.topicContent)
											: ''}
									</div>

									{/* <div className='grid grid-cols-10'>
										<div className='col-span-4  ml-[-30px]'>
											<div className='text-primary font-medium grid grid-cols-5  text-center divide-x divide-gray-400 '>
												<div className=''>Quote</div>
												<div className=''>Follow</div>
												<div className=''>Bookmark</div>
												<div className=''>Report</div>
												<div className=''>2 upvote</div>
											</div>
										</div>
									</div> */}
								</article>
							</div>
							{/*-------------------------------- topic comments -------------------------------*/}
							<CourseDiscussionCommentsComponent
								comments={topic.comments}
								handleCreateComment={handleCreateComment}
								handleDeleteComment={handleDeleteComment}
								status={status}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default CourseContentTabsDiscussionListDetail;
