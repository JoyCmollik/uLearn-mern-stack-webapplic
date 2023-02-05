import React, { useEffect, useState } from 'react';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Avatar, Spin } from 'antd';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import useAuth from '../../../hooks/useAuth';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../hooks/useFramerMotion';
import Loading from '../../layout/Loading/Loading';
import Lottie from '../../layout/Lottie/Lottie';

const CourseContentTabsDiscussionOwned = ({ isLoading, courseTopics }) => {
	const [ownedTopics, setOwnedTopics] = useState([]);
	const { user: currUser } = useAuth();
	const { list, item } = useFramerMotion();

	useEffect(() => {
		if (courseTopics?.length) {
			setOwnedTopics(() => {
				return courseTopics.filter(
					(topic) => topic?.user?._id === currUser?.userId
				);
			});
		}
	}, [courseTopics]);
	return (
		<section className=''>
			{/*-------------------------all other topics----------------------------*/}
			<div className='space-y-4'>
				{isLoading === 0 ? (
					<div className='h-[35vh] flex justify-center items-center'>
						<Loading />{' '}
					</div>
				) : (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={list}
					>
						{/*------------------------- single topic ----------------------------*/}
						{ownedTopics.length === 0 ? (
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
							ownedTopics.map((topic) => {
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
										<div className='flex space-x-2 justify-center items-center'>
											{/* ---------------- votes stats ---------------- */}
											<div className='text-font2'>
												<span className='mr-1'>
													{votes?.length || 0}
												</span>
												vote
											</div>
											<div className='p-0.5 rounded-lg bg-font2' />
											{/* ---------------- comment stats ---------------- */}
											<div className='text-font2'>
												<span className='mr-1'>
													{comments?.length || 0}
												</span>
												comment
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

export default CourseContentTabsDiscussionOwned;
