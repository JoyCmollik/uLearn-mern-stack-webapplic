import { Input, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Loading from '../../../../components/layout/Loading/Loading';
import DashTextEditor from '../../DashTextEditor/DashTextEditor';

const EditBasic = ({ course, handleUpdateCourse, isUpdating }) => {
	const [editorContent, setEditorContent] = useState('');
	const { control, handleSubmit } = useForm({});

	useEffect(() => {
		if (course) {
			setEditorContent(course.courseDesc);
		}
	}, [course]);

	const handleUpdateBasic = (data) => {
		data.courseDesc = editorContent;

		const newCourseData = { ...course, ...data };
		handleUpdateCourse(newCourseData);
	};

	return (
		<>
			{!course ? (
				<div className='flex justify-center items-center h-[40vh]'>
					<Loading />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(handleUpdateBasic)}
					className=' border rounded-lg h-fit w-11/12'
				>
					<div className='p-4 grid grid-cols-12 gap-4'>
						{/* input item */}
						<div className='col-span-12 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Course Title
							</label>
							<Controller
								name='courseTitle'
								control={control}
								defaultValue={course.courseTitle}
								render={({ field }) => (
									<Input {...field} size='large' />
								)}
							/>
						</div>
						<div className='col-span-12 space-y-2'>
							<label className='text-font2 uppercase'>
								Short Description
							</label>
							<Controller
								name='courseShortDesc'
								control={control}
								defaultValue={course.courseShortDesc}
								render={({ field }) => (
									<TextArea rows={2} {...field} />
								)}
							/>
						</div>
						<div className='col-span-12 space-y-2'>
							<label className='text-font2 uppercase'>
								Description
							</label>
							<DashTextEditor
								editorContent={editorContent}
								setEditorContent={setEditorContent}
							/>
						</div>
						<div className='col-span-4 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Category
							</label>
							<Controller
								name='category'
								control={control}
								defaultValue={course.category}
								render={({ field }) => (
									<Select
										placeholder='select a category'
										{...field}
										size='large'
									>
										<Select.Option value='Computer Science & Engineering'>
											Computer Science & Engineering
										</Select.Option>
										<Select.Option value='Economics'>
											Economics
										</Select.Option>
										<Select.Option value='Business Studies'>
											Business Studies
										</Select.Option>
										<Select.Option value='Sociology'>
											Sociology
										</Select.Option>
									</Select>
								)}
							/>
						</div>
						<div className='col-span-4 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Level
							</label>
							<Controller
								name='level'
								control={control}
								defaultValue={course.level}
								render={({ field }) => (
									<Select
										{...field}
										placeholder={'select level'}
										size='large'
									>
										<Select.Option value='Beginner'>
											Beginner
										</Select.Option>
										<Select.Option value='Intermediate'>
											Intermediate
										</Select.Option>
										<Select.Option value='Advanced'>
											Advanced
										</Select.Option>
									</Select>
								)}
							/>
						</div>
						<div className='col-span-4 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Language
							</label>
							<Controller
								name='language'
								control={control}
								defaultValue={course.language}
								render={({ field }) => (
									<Select
										{...field}
										placeholder={'select language'}
										size='large'
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
					</div>
					<div className='p-4 bg-light'>
						<button
							className='px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
							type='submit'
							disabled={isUpdating}
						>
							{isUpdating ? (
								<span className='flex items-center'>
									<Loading size='small' />{' '}
									<span className='ml-2'>Updating...</span>
								</span>
							) : (
								'Update Basic Information'
							)}
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default EditBasic;
