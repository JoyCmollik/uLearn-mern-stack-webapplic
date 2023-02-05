import React, { useEffect, useRef, useState } from 'react';
import { Avatar, message, Spin } from 'antd';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';

import useAuth from '../../../hooks/useAuth';
import { BsCheckLg } from 'react-icons/bs';
import Loading from '../../layout/Loading/Loading';
import axios from 'axios';

const CourseContentDiscussionUpdateTopic = ({
	isLoading,
	handleUpdateTopic,
}) => {
	const [topic, setTopic] = useState(null);
	const [fetching, setFetching] = useState(true);
	const { topicId } = useParams();
	const [editorContent, setEditorContent] = useState();
	const [title, setTitle] = useState('');

	// function - on component load
	useEffect(() => {
		if (topicId) {
			setFetching(true);
			axios
				.get(`/topics/${topicId}`)
				.then((response) => {
					setTopic(response.data.topic);
					console.log(response.data.topic);
					setEditorContent(response.data.topic?.topicContent);
					setTitle(response.data.topic.topicTitle);
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setFetching(false);
				});
		}
	}, [topicId]);

	const updateTopic = () => {
		if (
			topic?.topicTitle === title &&
			editorContent === topic?.topicContent
		) {
			message.warning('Please make changes before updating.');
			return;
		}
		const newTopic = {
			...topic,
			topicTitle: title,
			topicContent: editorContent,
		};
		handleUpdateTopic(newTopic);
	};

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
									value={title}
									onChange={(e) => setTitle(e.target.value)}
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
					</div>
					<div className='flex justify-end bg-light p-4 space-x-2'>
						{/*--------------------- publish button ----------------------------*/}
						<button
							onClick={() => updateTopic()}
							className='px-4 py-1 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize disabled:opacity-10'
							disabled={isLoading}
						>
							{isLoading ? (
								<span className='flex items-center'>
									{' '}
									<Loading size='small' />{' '}
									<span className='ml-1'>Updating...</span>{' '}
								</span>
							) : (
								'Update Topic'
							)}
						</button>
						<button
							className='px-4 py-1 rounded-lg border-[0.5px] border-error text-error flex space-x-2 items-center capitalize'
							onClick={() => window.history.back()}
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

export default CourseContentDiscussionUpdateTopic;
