import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import './CourseContentTabDiscussionListDetail.css';
import { Dropdown, Menu } from 'antd';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
import { Avatar, message, Progress, Spin } from 'antd';
import axios from 'axios';
import {
	MdOutlineArrowBack,
	MdOutlineDelete,
	MdOutlineEdit,
} from 'react-icons/md';
import moment from 'moment';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import CourseDiscussionCommentsComponent from './CourseDiscussionComments/CourseDiscussionCommentsComponent';
import useAuth from '../../../hooks/useAuth';
import { BsFillCaretUpFill } from 'react-icons/bs';
import Loading from '../../layout/Loading/Loading';
import { HiDotsVertical } from 'react-icons/hi';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const parse = require('html-react-parser');

const initialStatus = {
	deleting: { _id: null, currStatus: false },
	creating: false,
	updating: false,
};

const CourseContentTabsDiscussionListDetail = ({ handleDeleteTopic, vote }) => {
	const [topic, setTopic] = useState(null);
	const [isLoading, setIsLoading] = useState();
	const [status, setStatus] = useState({ ...initialStatus });
	const [triggerFetching, setTriggerFetching] = useState(true);

	// library constants
	const { topicId } = useParams();
	const { user: currUser } = useAuth();
	const { handleUpVote, handleDownVote, voteStatus, setVoteStatus } = vote;

	// function - on component load
	useEffect(() => {
		if (topicId && triggerFetching) {
			if(!topic) setIsLoading(true);
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

	// will manipulate vote count locally
	useEffect(() => {
		if (topic?.votes && voteStatus?.upvoted) {
			setTopic((prevTopic) => {
				if (prevTopic?.votes && prevTopic?.votes?.length > 0) {
					return {
						...prevTopic,
						votes: [...prevTopic?.votes, currUser?.userId],
					};
				} else {
					return {
						...prevTopic,
						votes: [currUser?.userId],
					};
				}
			});
			setVoteStatus((prevStatus) => {
				return { ...prevStatus, upvoted: false };
			});
		}

		if (topic?.votes && voteStatus?.downvoted) {
			setTopic((prevTopic) => {
				return {
					...prevTopic,
					votes: [
						...prevTopic.votes.filter(
							(vote) => String(vote) !== String(currUser?.userId)
						),
					],
				};
			});
			setVoteStatus((prevStatus) => {
				return { ...prevStatus, downvoted: false };
			});
		}
	}, [voteStatus]);

	// function - create a comment
	const handleCreateComment = (commentBody, setEditorContent) => {
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
				setEditorContent('');
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

	// function - delete a comment
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

	const showDeleteConfirm = () => {
		confirm({
			title: 'Are you sure delete this topic?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				handleDeleteTopic(topicId);
			},
			onCancel() {
				console.log('Cancel');
			},
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
					<Loading />{' '}
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
										{/*--------------------- vote and more options ----------------------------*/}
										<div className='flex items-center space-x-2'>
											{/*---------------------topic vote ----------------------------*/}
											<div className='border border-font2 rounded-lg flex text-sm text-font1 overflow-hidden'>
												<button
													onClick={() =>
														handleUpVote(topic._id)
													}
													className='block px-2 border-r border-font2 disabled:bg-gray-200 disabled:cursor-not-allowed'
													disabled={
														!currUser ||
														topic.votes.includes(
															currUser?.userId
														)
													}
												>
													{topic.votes.includes(
														currUser.userId
													) ? (
														<BsFillCaretUpFill
															size={17}
														/>
													) : (
														<BiUpArrow />
													)}
												</button>
												<div className='text-base font-medium px-2'>
													{topic?.votes?.length || 0}
												</div>
												{/* ---------------- downvote ---------------- */}
												<button
													onClick={(e) =>
														handleDownVote(
															topic._id
														)
													}
													disabled={
														!currUser ||
														!topic.votes.includes(
															currUser?.userId
														)
													}
													className=' block px-2 border-l border-font2 disabled:bg-gray-200 disabled:cursor-not-allowed'
												>
													<BiDownArrow />
												</button>
											</div>
											{topic?.user?._id ===
											currUser?.userId ? (
												<>
													{/* ---------------- More options ---------------- */}
													<div className='flex items-center'>
														<Dropdown
															overlay={
																<div className='p-2 bg-white drop-shadow rounded-lg flex flex-col space-y-2'>
																	<Link
																		to={`/course-content/${topic?.course}/discussions/editTopic/${topic._id}`}
																	>
																		<button className='w-full px-4 py-1 border border-primary rounded-lg text-primary flex items-center space-x-2'>
																			<span>
																				<MdOutlineEdit />
																			</span>
																			<span>
																				Edit
																				Topic
																			</span>
																		</button>
																	</Link>
																	<button
																		onClick={
																			showDeleteConfirm
																		}
																		className='w-full px-4 py-1 border border-error rounded-lg text-error flex items-center space-x-2'
																	>
																		<span>
																			<MdOutlineDelete />
																		</span>
																		<span>
																			Delete
																			Topic
																		</span>
																	</button>
																</div>
															}
															className='cursor-pointer'
															placement='bottomLeft'
															arrow={{
																pointAtCenter: true,
															}}
														>
															<HiDotsVertical
																size={20}
															/>
														</Dropdown>
													</div>
												</>
											) : null}
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
								comments={topic?.comments}
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
