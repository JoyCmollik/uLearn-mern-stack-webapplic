import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import moment from 'moment';
import { MdDeleteOutline } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';

const parse = require('html-react-parser');

const CourseDiscussionComment = ({ comment, handleDeleteComment, status }) => {
	const { user } = useAuth();

	return (
		<div className='grid grid-cols-12 gap-4 p-4 border-b'>
			{/*--------------------- user ----------------------*/}
			<div className='wrapper col-span-1 flex justify-end items-start'>
				<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
					<Avatar
						size={40}
						src={comment?.user?.avatarURL}
						alt={comment?.user?.name}
					/>
				</div>
			</div>
			<div className='col-span-11 flex justify-between'>
				<div className='flex-grow flex flex-col justify-between space-y-2'>
					{/* user name, posting time */}
					<div className='space-y-[2px] flex flex-col items-start justify-start'>
						<h2 className='text-base font-semibold text-font1 m-0 p-0'>
							{comment?.user?.name}
						</h2>
						<div className='m-0 p-0 text-font2'>
							Posted {moment(comment.createdAt).fromNow()}
						</div>
					</div>
					{/* comment body */}
					<div>
						{comment.commentBody ? parse(comment.commentBody) : ''}
					</div>
				</div>
				{user.userId === comment.user._id && (
					<div>
						<button
							onClick={() => handleDeleteComment(comment._id)}
							className='text-error border border-error rounded-lg p-1'
							disabled={status.deleting.currStatus}
						>
							{status.deleting.currStatus &&
							status.deleting._id === comment._id ? (
								<LoadingOutlined
									style={{
										fontSize: 18,
									}}
									spin
								/>
							) : (
								<MdDeleteOutline size={18} />
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseDiscussionComment;
