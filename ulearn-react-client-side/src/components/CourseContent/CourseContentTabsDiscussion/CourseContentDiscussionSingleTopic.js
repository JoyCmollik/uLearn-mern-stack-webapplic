import React, { useEffect, useState } from 'react';
import useDiscussion from '../../../hooks/useDiscussion';
import useFramerMotion from '../../../hooks/useFramerMotion';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const CourseContentDiscussionSingleTopic = ({ topic, topicIdx }) => {
	const [topicVotes, setTopicVotes] = useState([]);
	const { listContainerVariant, itemVariant } = useFramerMotion();
	const { handleUpVoteTopic, handleDownVoteTopic } = useDiscussion();
	const { user: currUser } = useAuth();
	const { _id, topicTitle, user, comments, createdAt } = topic;

	useEffect(() => {
		if (topic?.votes) {
			setTopicVotes(topic.votes);
		}
	}, [topic]);

	return (
		<motion.article
			key={_id}
			className='flex justify-between items-center border-b-2 p-4 hover:bg-light rounded-t-lg transition'
			variants={itemVariant}
			custom={(topicIdx + 1) * 0.1}
			layout
		>
			{/* ---------------- topic left---------------- */}
			<Link className='flex-grow' to={`topics/${_id}`}>
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
								Posted {moment(createdAt).fromNow()}
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
						onClick={() => handleUpVoteTopic(_id, setTopicVotes)}
						className='block px-2 border-r border-font2 disabled:bg-gray-200 disabled:cursor-not-allowed'
						disabled={
							!currUser || topicVotes.includes(currUser?.userId)
						}
						whileTap={{ scale: 0.8 }}
						transition={{
							type: 'spring',
							stiffness: 400,
							damping: 17,
						}}
					>
						{topicVotes.includes(currUser?.userId) ? (
							<BsFillCaretUpFill size={17} />
						) : (
							<BiUpArrow />
						)}
					</motion.button>
					<div className='text-base font-medium px-2'>
						{topicVotes.length || 0}
					</div>
					{/* ---------------- downvote ---------------- */}
					<motion.button
						onClick={(e) => handleDownVoteTopic(_id, setTopicVotes)}
						disabled={
							!currUser || !topicVotes.includes(currUser?.userId)
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
					<span className='mr-1'>{comments.length || 0}</span>
					comments
				</div>
			</div>
		</motion.article>
	);
};

export default CourseContentDiscussionSingleTopic;
