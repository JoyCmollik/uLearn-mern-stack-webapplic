import React from 'react';
import { Alert, Tag } from 'antd';
import { MdDashboard } from 'react-icons/md';
import { motion } from 'framer-motion';
import nodataImg from '../../../images/no_data.png';
import { Link } from 'react-router-dom';
import useFramerMotion from '../../../hooks/useFramerMotion';

const CourseContentLessons = ({ handleCurrLesson, currSection }) => {
	const { listContainerVariant, itemVariant } = useFramerMotion();
	return (
		<>
			{!currSection ? (
				<div className='flex justify-center items-center h-full'>
					<img className='w-[500px]' src={nodataImg} alt='no-data' />
				</div>
			) : (
				<>
					{/*****--------------lesson container - section title---------------*****/}
					<div className=' py-2 flex space-x-4 items-center'>
						<input
							className='text-xl p-2 font-bold capitalize focus:outline-none bg-transparent border-b-[0.5px] w-[50%]'
							value={currSection.sectionTitle}
							disabled={true}
							type='text'
						/>
					</div>
					{/*****--------------lesson details---------------*****/}
					<div className='py-2 space-y-4'>
						{!currSection?.lessons?.length ? (
							<Alert
								style={{
									borderRadius: '8px',
								}}
								message='No lessons available for this section yet.'
								type='info'
								showIcon
							/>
						) : (
							<>
								{' '}
								<motion.div
									className='space-y-2'
									initial='hidden'
									animate='visible'
									variants={listContainerVariant}
								>
									{currSection.lessons.map(
										(lesson, lessonIdx) => (
											<motion.article
												key={lesson._id}
												variants={itemVariant}
												custom={(lessonIdx + 1) * 0.1}
												whileHover={{ scale: 1.005 }}
												whileTap={{ scale: 0.98 }}
											>
												<Link
													key={lesson._id}
													to={`lesson/${lesson._id}`}
												>
													<div className='p-4 rounded-lg border space-y-4'>
														{/*****--------------lesson settings---------------*****/}
														<div className='flex justify-between items-center'>
															{/*****--------------lesson settings - title desc---------------*****/}
															<div className='flex justify-start items-center space-x-2 '>
																<div className='p-2 rounded-full flex justify-center items-center bg-light text-font1'>
																	<MdDashboard
																		size={
																			25
																		}
																	/>
																</div>
																<div>
																	<h4 className='font-normal m-0 text-font1 text-lg '>
																		Lesson{' '}
																		{lessonIdx +
																			1}{' '}
																		:{' '}
																		{
																			lesson.lessonTitle
																		}
																	</h4>
																	<p className='m-0 text-font2 text-xs'>
																		{
																			lesson.lessonReadDuration
																		}{' '}
																		Min Read
																		|{' '}
																		{lesson.language &&
																			`in 
																			${lesson.language}`}
																		{!lesson.lessonContent && (
																			<Tag
																				size='small'
																				color='error'
																			>
																				no
																				content
																			</Tag>
																		)}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</motion.article>
										)
									)}
								</motion.div>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default CourseContentLessons;
