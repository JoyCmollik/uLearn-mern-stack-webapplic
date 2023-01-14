import { Avatar } from 'antd';
import React, { useRef, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';

import useAuth from '../../../hooks/useAuth';

const CourseContentDiscussionAddTopic = () => {
	const [editorContent, setEditorContent] = useState();
	const titleRef = useRef('');

	// hook constants
	const { user } = useAuth();

	const handleCreateTopic = () => {
		const topicTitle = titleRef.current;
		console.log(topicTitle);
	}

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
				<div className='col-span-2 border-r border p-5'>
					<Avatar size={64} src={user?.avatarURL} alt={user?.name} />
					{/*-----------------set Name-----------------------*/}
					<h2 className='text-base text-primary'>{user?.name}</h2>
				</div>
				<div className='col-span-10 flex flex-col'>
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
						<button
							onClick={() => handleCreateTopic}
							className='px-4 py-1 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'
						>
							Publish Topic
						</button>
						<button className='px-4 py-1 rounded-lg border-[0.5px] border-error text-error flex space-x-2 items-center capitalize'>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseContentDiscussionAddTopic;
