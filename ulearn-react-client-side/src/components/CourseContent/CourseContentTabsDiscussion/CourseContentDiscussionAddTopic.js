import React, { useRef, useState } from 'react';
import { Avatar, Spin } from 'antd';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';

import useAuth from '../../../hooks/useAuth';
import { BsCheckLg } from 'react-icons/bs';
import Loading from '../../layout/Loading/Loading';

const CourseContentDiscussionAddTopic = ({ isLoading, handleCreateTopic }) => {
	const [editorContent, setEditorContent] = useState();
	const titleRef = useRef('');

	// hook constants
	const { user } = useAuth();

	return (
		<div className='space-y-4'>
			{/*--------------back---------------------*/}
			<div className='flex justify-end'>
				<button
					onClick={() => window.history.back()}
					className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'
				>
					<MdOutlineArrowBack size={20} /> <span>Go Back</span>
				</button>
			</div>
			<div className='grid grid-cols-12 border rounded-lg'>
				<div className='col-span-2 p-2'>
					{/*---------------------topic author ----------------------------*/}
					<article className='py-8 flex flex-col justify-start items-center  bg-light rounded-lg h-full space-y-2'>
						<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
							<Avatar
								size={55}
								src={user?.avatarURL}
								alt={user.name}
							/>
						</div>

						<div className='text-font2 space-y-1 text-center'>
							<p className='m-0 p-0 font-semibold'>
								{user?.name}
							</p>
							<p className='m-0 px-4 py-1 text-sm font-light border rounded-lg'>
								{user?.role}
								{/* {moment(topic.createdAt).fromNow()} */}
							</p>
						</div>
					</article>
				</div>
				<div className='col-span-10 flex flex-col border-l'>
					<div className='p-4 space-y-4'>
						<div>
							<label className='block'>
								<input
									ref={titleRef}
									placeholder='Topic Title'
									className='border px-5 py-3 rounded-lg w-full text-base'
								/>
							</label>
						</div>
						<div>
							<DashTextEditor
								editorContent={editorContent}
								setEditorContent={setEditorContent}
							/>
						</div>
						<div>
							<span>
								This topic will be published once posted
							</span>
						</div>
					</div>
					<div className='flex justify-end bg-light p-4 space-x-2'>
						{/*--------------------- publish button ----------------------------*/}
						<button
							onClick={() =>
								handleCreateTopic(
									titleRef.current.value,
									editorContent
								)
							}
							className='px-4 py-1 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'
							disabled={isLoading}
						>
							{isLoading ? (
								<span className='flex items-center'>
									{' '}
									<Loading size='small' />{' '}
									<span className='ml-1'>
										Publishing...
									</span>{' '}
								</span>
							) : (
								'Publish Topic'
							)}
						</button>
						<button
							className='px-4 py-1 rounded-lg border-[0.5px] border-error text-error flex space-x-2 items-center capitalize'
							disabled={isLoading}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseContentDiscussionAddTopic;
