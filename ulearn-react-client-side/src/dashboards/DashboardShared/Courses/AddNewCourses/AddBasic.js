import { useRef, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import DashTextEditor from '../../DashTextEditor/DashTextEditor';
import { Controller } from 'react-hook-form';
import { HiArrowRight } from 'react-icons/hi2';

const AddBasic = ({
	handleActiveTab,
	control,
	editorContent,
	setEditorContent,
	categories,
}) => {
	const editor = useRef('');

	return (
		<div className='wrapper border rounded-lg  w-11/12'>
			<div className='grid grid-cols-12 gap-4 p-4'>
				{/* input item */}
				<div className='col-span-12 space-y-2 flex flex-col'>
					<label className='text-font2 uppercase'>Course Title</label>
					<Controller
						name='courseTitle'
						control={control}
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
						render={({ field }) => <TextArea rows={2} {...field} />}
					/>
				</div>
				<div className='col-span-12 space-y-2'>
					<label className='text-font2 uppercase'>Description</label>
					<DashTextEditor
						editor={editor}
						editorContent={editorContent}
						setEditorContent={setEditorContent}
					/>
				</div>
				<div className='col-span-4 space-y-2 flex flex-col'>
					<label className='text-font2 uppercase'>Category</label>
					<Controller
						name='category'
						control={control}
						render={({ field }) => (
							<Select
								placeholder='select a category'
								{...field}
								size='large'
							>
								{categories.map((categoryItem) => (
									<Select.Option
										key={categoryItem._id}
										value={categoryItem.category}
									>
										{categoryItem.category}
									</Select.Option>
								))}
							</Select>
						)}
					/>
				</div>
				<div className='col-span-4 space-y-2 flex flex-col'>
					<label className='text-font2 uppercase'>Level</label>
					<Controller
						name='level'
						control={control}
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
									Advancedq
								</Select.Option>
							</Select>
						)}
					/>
				</div>
				<div className='col-span-4 space-y-2 flex flex-col'>
					<label className='text-font2 uppercase'>Language</label>
					<Controller
						name='language'
						control={control}
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
			<div className='flex justify-end items-center bg-light p-4'>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleActiveTab('2');
					}}
					className='px-5 py-2 text-primary border border-primary rounded-lg flex items-center space-x-2'
					type='primary'
				>
					<span>Next</span>{' '}
					<span>
						<HiArrowRight />
					</span>
				</button>
			</div>
		</div>
	);
};

export default AddBasic;
