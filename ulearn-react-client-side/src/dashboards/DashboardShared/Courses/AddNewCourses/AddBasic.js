import { Button, Checkbox, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRef, useState } from 'react';
import DashTextEditor from '../../DashTextEditor/DashTextEditor';

const AddBasic = ({ handleActiveTab }) => {
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState();

	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Title</label>
				<Input size='large' name='title' />
			</div>
			<div className='col-span-12 space-y-2'>
				<label className='text-font2 uppercase'>
					Short Description
				</label>
				<TextArea rows={2} />
			</div>
			<div className='col-span-12 space-y-2'>
				<label className='text-font2 uppercase'>
					Description
				</label>
				<DashTextEditor
					editor={editor}
					editorContent={editorContent}
					setEditorContent={setEditorContent}
				/>
			</div>
			<div className='col-span-4 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Category</label>
				<Select size='large'>
					<Select.Option value='demo'>Demo</Select.Option>
				</Select>
			</div>
			<div className='col-span-4 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Level</label>
				<Select size='large'>
					<Select.Option value='demo'>Demo</Select.Option>
				</Select>
			</div>
			<div className='col-span-4 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Language</label>
				<Select size='large'>
					<Select.Option value='demo'>Demo</Select.Option>
				</Select>
			</div>
			<Button
				onClick={() => handleActiveTab('2')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddBasic;
