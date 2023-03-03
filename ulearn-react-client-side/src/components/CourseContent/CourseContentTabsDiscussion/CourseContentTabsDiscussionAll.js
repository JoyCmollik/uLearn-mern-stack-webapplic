import React from 'react';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../hooks/useFramerMotion';
import Loading from '../../layout/Loading/Loading';
import Lottie from '../../layout/Lottie/Lottie';
import { AiOutlineSearch } from 'react-icons/ai';
import CourseContentDiscussionSingleTopic from './CourseContentDiscussionSingleTopic';

const CourseContentTabsDiscussionAll = ({ isLoading, courseTopics }) => {
	const { listContainerVariant, itemVariant } = useFramerMotion();
	return (
		<section className=''>
			{/*----------------------------------search-----------------------------*/}
			<div className='flex items-center justify-between space-x-3 bg-white border border-gray-200  rounded-lg py-2 px-4 mb-2'>
				<div>
					<AiOutlineSearch className='text-xl ml-3 inline-block text-gray-500 ' />
					<input
						type='text'
						placeholder='Search discussions...'
						className='text-base text-black focus:outline-none m-1 '
					/>
				</div>
			</div>
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
						variants={listContainerVariant}
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
							courseTopics.map((topic, topicIdx) => {
								return (
									<CourseContentDiscussionSingleTopic
										key={topicIdx}
										topicIdx={topicIdx}
										topic={topic}
									/>
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
