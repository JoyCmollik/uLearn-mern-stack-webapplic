import { Avatar, Spin } from 'antd';
import React from 'react';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import useAuth from '../../../hooks/useAuth';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../hooks/useFramerMotion';
import Loading from '../../layout/Loading/Loading';
import Lottie from '../../layout/Lottie/Lottie';

const CourseContentTabsDiscussionAll = ({ isLoading, courseTopics, vote }) => {
	const { handleUpVote, handleDownVote } = vote;
	const { user: currUser } = useAuth();
	const { list, item } = useFramerMotion();
	return (
		<section className=''>
			{/*-------------------------all other topics----------------------------*/}
			<div className='space-y-4'>
				{isLoading ? (
					<div className='h-[35vh] flex justify-center items-center'>
						{' '}
						<Loading />{' '}
					</div>
				) : (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={list}
					>
						{/*------------------------- single topic ----------------------------*/}
						{courseTopics.length === 0 ? (
							<div className='flex flex-col justify-center items-center space-y-4'>
								<Lottie
									src='https://assets8.lottiefiles.com/packages/lf20_dqTQu9NJiM.json'
									size={{
										width: '450',
										height: '450',
									}}
								/>
								<div className='px-4 py-2 text-2xl font-medium bg-light rounded-lg backdrop-filter'>
									No Topics Created Yet!
								</div>
							</div>
						) : (
							courseTopics.map((topic) => {
								const {
									_id,
									topicTitle,
									user,
									votes,
									comments,
									createdAt,
								} = topic;
								return (
									<motion.article
										key={_id}
										className='flex justify-between items-center border-b-2 p-4 hover:bg-light rounded-t-lg transition'
										variants={item}
										layout
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
												<motion.button
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
													whileTap={{ scale: 0.8 }}
													transition={{
														type: 'spring',
														stiffness: 400,
														damping: 17,
													}}
												>
													{votes.includes(
														currUser?.userId
													) ? (
														<BsFillCaretUpFill
															size={17}
														/>
													) : (
														<BiUpArrow />
													)}
												</motion.button>
												<div className='text-base font-medium px-2'>
													{votes.length || 0}
												</div>
												{/* ---------------- downvote ---------------- */}
												<motion.button
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
													whileTap={{ scale: 0.8 }}
													transition={{
														type: 'spring',
														stiffness: 400,
														damping: 17,
													}}
												>
													<BiDownArrow />
												</motion.button>
											</div>
											{/* ---------------- comment stats ---------------- */}
											<div className='text-font2'>
												<span className='mr-1'>
													{comments.length || 0}
												</span>
												comments
											</div>
										</div>
									</motion.article>
								);
							})
						)}
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default CourseContentTabsDiscussionAll;
