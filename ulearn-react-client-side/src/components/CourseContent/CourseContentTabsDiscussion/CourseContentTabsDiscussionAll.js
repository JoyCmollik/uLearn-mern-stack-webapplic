import { Avatar, Spin } from 'antd';
import React from 'react';
import { BsPin, BsThreeDots } from 'react-icons/bs';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const CourseContentTabsDiscussionAll = ({ isLoading, courseTopics }) => {
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
								voteCount,
								commentCount,
								createdAt,
							} = topic;
							return (
								<Link key={_id} to={`topics/${_id}`}>
									<article className='flex justify-between items-center border-b-2 p-4 hover:bg-light rounded-t-lg transition'>
										{/* ---------------- topic left---------------- */}
										<div className='flex-grow flex items-center space-x-4'>
											<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
												<Avatar
													size={49}
													src={user?.avatarURL}
													alt={user.name}
												/>
											</div>
											<div className=''>
												<h2 className='text-xl font-semibold m-0'>
													{topicTitle}
												</h2>
												<div className='text-font2 flex space-x-1'>
													<p className='m-0 p-0 underline font-light'>
														{user.name}
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
										{/* ---------------- topic right ---------------- */}
										<div className='flex flex-col space-y-2 justify-center items-end'>
											{/* ---------------- vote buttons ---------------- */}
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
											{/* ---------------- comment stats ---------------- */}
											<div className='text-font2'>
												<span className='mr-1'>4</span>
												comments
											</div>
										</div>
									</article>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default CourseContentTabsDiscussionAll;
