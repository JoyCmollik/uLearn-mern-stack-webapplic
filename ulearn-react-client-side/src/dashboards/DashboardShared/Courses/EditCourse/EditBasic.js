import { Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import DashTextEditor from '../../DashTextEditor/DashTextEditor';

const EditBasic = ({control, editorContent, setEditorContent}) => {
    const editor = useRef('');
  return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Title</label>
				<Controller
					name='courseTitle'
					control={control}
					render={({ field }) => <Input {...field} size='large' />}
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
								Advanced
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
  );
}

export default EditBasic