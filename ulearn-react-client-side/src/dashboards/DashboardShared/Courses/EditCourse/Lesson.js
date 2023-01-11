import React, { useRef, useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { MdDashboard, MdDelete, MdEdit } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi2';
import { BsArrowsMove, BsJournalMedical } from 'react-icons/bs';
import { TbMinimize } from 'react-icons/tb';
import { Controller, useForm } from 'react-hook-form';
import { InputNumber, message, Select, Spin, Tag } from 'antd';
import axios from 'axios';
import DashTextEditor from '../../DashTextEditor/DashTextEditor';

const Lesson = ({ lesson, handleUpdateLesson }) => {
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState(lesson.lessonContent);
	const [isEditing, setIsEditing] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	// library constants
	const controls = useDragControls();
	const { control, handleSubmit, reset } = useForm({});

	const handleLessonSubmit = (data) => {
		if (data.language && data.lessonReadDuration && editorContent) {
			setIsUpdating(true);
			data.lessonContent = editorContent;
			const newLesson = { ...lesson, ...data };
			console.log(newLesson);

			axios
				.patch(`/lessons/${lesson._id}`, { ...newLesson })
				.then((response) => {
					const updatedLesson = response.data.lesson;
					message.success('Lesson updated!');
					setIsEditing(false);
					setEditorContent('');
					reset();
					// lifting state up here
					handleUpdateLesson(updatedLesson);
				})
				.catch((error) => {
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		} else {
			message.warning('Please fill in all the inputs.');
		}
	};

	const handleLessonContentAdd = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<article key={lesson._id} className='p-4 rounded-lg border space-y-4'>
			{/*****--------------lesson settings---------------*****/}
			<div className='flex justify-between items-center'>
				{/*****--------------lesson settings - title desc---------------*****/}
				<div className='flex justify-start items-center space-x-2 '>
					<div className='p-2 rounded-full flex justify-center items-center bg-light'>
						<MdDashboard size={25} />
					</div>
					<div>
						<h4 className='font-normal m-0 text-font1 text-lg '>
							{lesson.lessonTitle}
						</h4>
						<p className='m-0 text-font2 text-xs'>
							{lesson.lessonReadDuration} Min Read |{' '}
							{lesson.language &&
								`in 
							${lesson.language}`}
							{!lesson.lessonContent && (
								<Tag size='small' color='error'>
									no content
								</Tag>
							)}
						</p>
					</div>
				</div>
				{/*****--------------lesson settings - func buttons---------------*****/}
				<div className='flex justify-between items-center space-x-2'>
					{!lesson.lessonContent ? (
						<button
							onClick={handleLessonContentAdd}
							className='p-2 border-[0.5px] bg-primary text-white flex items-center rounded-full'
						>
							{!isEditing ? (
								<HiPlus size={20} />
							) : (
								<TbMinimize size={20} />
							)}
						</button>
					) : (
						<button
							onClick={handleLessonContentAdd}
							className='p-2 border-[0.5px] bg-primary text-white flex items-center rounded-full'
						>
							<HiPlus size={20} />
						</button>
					)}
					<button className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full'>
						<MdDelete size={20} />
					</button>
					<button className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full'>
						<MdEdit size={20} />
					</button>
					<button
						onPointerDown={(e) => controls.start(e)}
						className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full disabled:text-gray-200'
						disabled={isEditing}
					>
						<BsArrowsMove size={20} />
					</button>
				</div>
			</div>
			{/*****--------------lesson content update component ---------------*****/}
			<div
				className={`border rounded-lg overflow-hidden ${
					!isEditing ? 'hidden' : 'block'
				}`}
			>
				<form
					onSubmit={handleSubmit(handleLessonSubmit)}
					className='space-y-1'
				>
					<div className='grid grid-cols-12 gap-4 p-4'>
						{/* input item */}
						<div className='col-span-6 space-y-2 flex flex-col'>
							<label className='text-font2 capitalize'>
								Language
							</label>
							<Controller
								name='language'
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										placeholder={'select language'}
										size='medium'
										defaultValue={lesson.language}
									>
										<Select.Option value='Bengali'>
											Bengali
										</Select.Option>
										<Select.Option value='English'>
											English
										</Select.Option>
									</Select>
								)}
							/>
						</div>
						{/* input item */}
						<div className='col-span-6 space-y-2 flex flex-col'>
							<label className='text-font2 capitalize'>
								Study Time (Min)
							</label>
							<Controller
								name='lessonReadDuration'
								control={control}
								render={({ field }) => (
									<InputNumber
										{...field}
										addonBefore='+'
										addonAfter='Minutes'
										defaultValue={lesson.lessonReadDuration}
										style={{
											borderRadius: '8px',
											overflow: 'hidden',
											border: '1px solid #d9d9d9',
										}}
									/>
								)}
							/>
						</div>
						{/* input item */}
						<div className='col-span-12 space-y-2'>
							<label className='text-font2 capitalize'>
								Content
							</label>
							<DashTextEditor
								editor={editor}
								editorContent={editorContent}
								setEditorContent={setEditorContent}
								minHeight={400}
							/>
						</div>
					</div>
					<div className='p-4 flex items-center space-x-2 bg-light'>
						<button
							className='col-span-4 px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
							type='submit'
							disabled={isUpdating}
						>
							{isUpdating ? (
								<Spin size='small' />
							) : (
								'Update Lesson'
							)}
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className='col-span-4 px-4 py-1 border border-error rounded-lg text-error disabled:border-red-200 disabled:text-red-200'
							type='submit'
							disabled={isUpdating}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</article>
	);
};

export default Lesson;
