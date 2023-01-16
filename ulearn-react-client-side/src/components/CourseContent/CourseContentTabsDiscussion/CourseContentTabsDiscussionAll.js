import { Avatar, Spin } from 'antd';
import React from 'react';
import {
	BsFillCaretDownFill,
	BsFillCaretUpFill,
	BsPin,
	BsThreeDots,
} from 'react-icons/bs';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { BiDownArrow, BiUpArrow, BiUpArrowAlt } from 'react-icons/bi';
import useAuth from '../../../hooks/useAuth';

const CourseContentTabsDiscussionAll = ({ isLoading, courseTopics, vote }) => {
	const { handleUpVote, handleDownVote } = vote;
	const { user: currUser } = useAuth();
	return (
		<section className=''>
			{/*-------------------------all other topics----------------------------*/}
			<div className='space-y-4'>
				<h2>All other topics</h2>
				{isLoading ? (
					<div className='h-[40vh] flex justify-center items-center'>
						{' '}
						<Spin size='large' />{' '}
					</div>
				) : (
					<div>
						{courseTopics.map((topic) => {
							const {
								_id,
								topicTitle,
								user,
								votes,
								comments,
								createdAt,
							} = topic;
							return (
								<>
									{/*------------------------- single topic ----------------------------*/}
									<article
										key={_id}
										className='flex justify-between items-center border-b-2 p-4 hover:bg-light rounded-t-lg transition'
									>
										{/* ---------------- topic left---------------- */}
										<Link
											className='flex-grow'
											to={`topics/${_id}`}
										>
											<div className='flex items-center space-x-4'>
												<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
													<Avatar
														size={49}
														src={user?.avatarURL}
														alt={user?.name}
													/>
												</div>
												<div className=''>
													<h2 className='text-xl font-semibold m-0'>
														{topicTitle}
													</h2>
													<div className='text-font2 flex space-x-1'>
														<p className='m-0 p-0 underline font-light'>
															{user?.name}
														</p>
														<span>.</span>
														<p className='m-0 p-0 font-light'>
															Posted{' '}
															{moment(
																createdAt
															).fromNow()}
														</p>
													</div>
												</div>
											</div>
										</Link>
										{/* ---------------- topic right ---------------- */}
										<div className='flex flex-col space-y-2 justify-center items-end'>
											{/* ---------------- vote buttons ---------------- */}
											<div className='border border-font2 rounded-lg flex text-sm text-font1 overflow-hidden'>
												{/* ---------------- upvote ---------------- */}
												<button
													onClick={() =>
														handleUpVote(_id)
													}
													className='block px-2 border-r border-font2 disabled:bg-gray-200 disabled:cursor-not-allowed'
													disabled={
														!currUser ||
														votes.includes(
															currUser?.userId
														)
													}
												>
													{votes.includes(
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
													{votes.length || 0}
												</div>
												{/* ---------------- downvote ---------------- */}
												<button
													onClick={(e) =>
														handleDownVote(_id)
													}
													disabled={
														!currUser ||
														!votes.includes(
															currUser?.userId
														)
													}
													className=' block px-2 border-l border-font2 disabled:bg-gray-200 disabled:cursor-not-allowed'
												>
													<BiDownArrow />
												</button>
											</div>
											{/* ---------------- comment stats ---------------- */}
											<div className='text-font2'>
												<span className='mr-1'>
													{comments.length || 0}
												</span>
												comments
											</div>
										</div>
									</article>
								</>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default CourseContentTabsDiscussionAll;
