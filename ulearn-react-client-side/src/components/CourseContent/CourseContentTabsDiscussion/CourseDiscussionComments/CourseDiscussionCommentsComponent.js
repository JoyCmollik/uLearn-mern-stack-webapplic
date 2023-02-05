import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, message, Progress, Spin } from 'antd';
import { UpOutlined, SmileOutlined } from '@ant-design/icons';
import DashTextEditor from '../../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
import useAuth from '../../../../hooks/useAuth';
import CourseDiscussionComment from './CourseDiscussionComment';
import Loading from '../../../layout/Loading/Loading';

const menu = (
	<Menu
		items={[
			{
				key: '1',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.antgroup.com'
					>
						1st menu item
					</a>
				),
			},
			{
				key: '2',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.aliyun.com'
					>
						2nd menu item
					</a>
				),
				icon: <SmileOutlined />,
			},
			{
				key: '3',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.luohanacademy.com'
					>
						3rd menu item
					</a>
				),
			},
		]}
	/>
);

const CourseDiscussionCommentsComponent = ({
	comments,
	handleCreateComment,
	handleDeleteComment,
	status,
}) => {
	const [editorContent, setEditorContent] = useState('');

	// library constants
	const { user } = useAuth();
	return (
		<div className='rounded-lg p-4 space-y-4'>
			{/*--------------------------------no of comments-------------------------------*/}
			<div className='flex justify-between items-center'>
				<h2 className='pt-4 text-base font-normal text-font1'>
					Comments <span> {`(${comments.length})`}</span>
				</h2>
				{/* <div className='flex items-center mt-2'>
					<span className='pr-2'>Sort by</span>
					<Dropdown
						overlay={menu}
						className='border  border-gray-400 rounded'
					>
						<a href='/xyz' onClick={(e) => e.preventDefault()}>
							<div className='flex px-3 space-x-14 items-center justify-between pt-1'>
								<h4 className='text-sm text-font2'>Hotness</h4>
								<CaretDownOutlined
									className='pb-1'
									style={{ color: 'gray' }}
								/>
							</div>
						</a>
					</Dropdown>
				</div> */}
			</div>
			<hr />
			<h2 className='text-base font-medium text-font1 text-center'>
				All Comments
			</h2>
			<hr />
			{/*--------------------- single comment card ----------------------*/}
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

			{/*------------------------------ create a comment here ---------------------------------*/}
			{user && (
				<div className='grid grid-cols-12 gap-4 p-4 rounded-lg bg-light'>
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
						<div>
							<DashTextEditor
								editorContent={editorContent}
								setEditorContent={setEditorContent}
							/>
						</div>
						<div className='flex justify-end bg-light rounded-lg p-4'>
							{/*--------------------- post button ----------------------------*/}
							<button
								onClick={(e) => {
									e.preventDefault();
									handleCreateComment(editorContent);
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
							</button>
						</div>
					</article>
				</div>
			)}
		</div>
	);
};

export default CourseDiscussionCommentsComponent;
