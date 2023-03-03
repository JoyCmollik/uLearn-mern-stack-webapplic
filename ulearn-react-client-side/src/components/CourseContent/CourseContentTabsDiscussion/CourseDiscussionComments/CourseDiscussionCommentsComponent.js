import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, message, Progress, Spin } from 'antd';
import { UpOutlined, SmileOutlined } from '@ant-design/icons';
import DashTextEditor from '../../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
import useAuth from '../../../../hooks/useAuth';
import CourseDiscussionComment from './CourseDiscussionComment';
import Loading from '../../../layout/Loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';
import Lottie from '../../../layout/Lottie/Lottie';

const CourseDiscussionCommentsComponent = ({
	comments,
	handleCreateComment,
	handleDeleteComment,
	status,
	setIsTyping,
	isSomeoneTyping,
}) => {
	const [editorContent, setEditorContent] = useState('');
	const { commentContainerVariant } = useFramerMotion();

	// library constants
	const { user } = useAuth();

	return (
		<motion.div layout className='rounded-lg p-4 space-y-4'>
			{/*--------------------------------no of comments-------------------------------*/}
			<motion.div
				layoutId='no_comments'
				className='flex justify-between items-center'
			>
				<h2 className='pt-4 text-base font-normal text-font1'>
					Comments <span> {`(${comments.length})`}</span>
				</h2>
			</motion.div>
			<hr />
			{comments?.length ? (
				<>
					<motion.h2
						layoutId='all_comments'
						className='text-base font-medium text-font1 text-center'
					>
						All Comments
					</motion.h2>
					<hr />
				</>
			) : null}
			{/*--------------------- comment cards ----------------------*/}
			<motion.div
				layoutId='list_of_comments'
				initial='hidden'
				animate='visible'
				variants={commentContainerVariant}
			>
				<AnimatePresence>
					{comments.length
						? comments.map((comment) => (
								<CourseDiscussionComment
									key={comment._id}
									comment={comment}
									handleDeleteComment={handleDeleteComment}
									status={status}
								/>
						  ))
						: null}
				</AnimatePresence>
			</motion.div>

			{isSomeoneTyping ? (
				<motion.div
					layoutId='someone_typing'
					className='text-font2 flex items-center'
				>
					<span>Somebody is typing </span>
					<Lottie
						src='https://assets8.lottiefiles.com/packages/lf20_e4wfqx.json'
						size={{ width: 50, height: 50 }}
					/>{' '}
				</motion.div>
			) : null}

			{/*------------------------------ create a comment here ---------------------------------*/}
			{user && (
				<motion.div
					layoutId='create_comment'
					className='grid grid-cols-12 gap-4 p-4 rounded-lg bg-light'
				>
					{/*--------------------- user ----------------------*/}
					<div className='wrapper col-span-2 flex justify-end items-start bg-light p-4 rounded-lg'>
						<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
							<Avatar
								size={55}
								src={user?.avatarURL}
								alt={user?.name}
							/>
						</div>
					</div>

					<article className='col-span-10 space-y-2'>
						{/*---------------------text editor----------------------*/}
						<div className='w-full'>
							{/* <DashTextEditor
								editorContent={editorContent}
								setEditorContent={setEditorContent}
								setIsTyping={setIsTyping}
							/> */}
							<textarea
								className='p-2 w-full rounded-lg outline-none border'
								rows={4}
								value={editorContent}
								onFocus={() => setIsTyping(true)}
								onBlur={() => setIsTyping(false)}
								onChange={(e) =>
									setEditorContent(e.target.value)
								}
							/>
						</div>
						<div className='flex justify-end bg-light rounded-lg p-4'>
							{/*--------------------- post button ----------------------------*/}
							<motion.button
								onClick={(e) => {
									e.preventDefault();
									setIsTyping(false);
									handleCreateComment(
										editorContent,
										setEditorContent
									);
								}}
								className='px-4 py-1 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'
								disabled={status.creating}
							>
								{status.creating ? (
									<span className='flex items-center'>
										<Loading size='small' />
										<span className='ml-1'>Posting</span>
									</span>
								) : (
									'Post Comment'
								)}
							</motion.button>
						</div>
					</article>
				</motion.div>
			)}
		</motion.div>
	);
};

export default CourseDiscussionCommentsComponent;
