import { Avatar } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
const CourseContentDiscussionAddTopic = () => {
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState();
	const navigate = useNavigate();
	return (
		<div className=''>
			{/*--------------back---------------------*/}
			<div className='flex justify-end pb-6'>
				<button
					onClick={() => navigate('/course-content/:course-content')}
					className='text-sm font-bold border border-black px-6 py-2 rounded-full'
				>
					Go back
				</button>
			</div>
			<div className='grid grid-cols-12 border border-gray-400'>
				<div className='col-span-2 border-r border-gray-300 p-5'>
					<Avatar
						size={64}
						src='https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png'
					/>
					{/*-----------------set Name-----------------------*/}
					<h2 className='text-base text-primary'>Anonymous Duck</h2>
				</div>
				<div className='col-span-10 p-5 flex flex-col space-y-5'>
					<div>
						<label class='block'>
							<input
								placeholder='Topic Title'
								className='border border-gray-300 px-5 py-3 rounded-lg w-full text-base'
							/>
						</label>
					</div>
					<div>
						<DashTextEditor
							editor={editor}
							editorContent={editorContent}
							setEditorContent={setEditorContent}
						/>
					</div>
					<div>
						<span>This topic will be published once posted</span>
					</div>
					<div className='flex justify-end'>
						<button className='text-sm font-bold text-white px-6 py-2 bg-zinc-800 rounded-full'>
							Publish Topic
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseContentDiscussionAddTopic;
