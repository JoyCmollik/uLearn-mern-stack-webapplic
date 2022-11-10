import { Button, Checkbox, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const AddBasic = ({ handleActiveTab }) => {
	return (
		<div className='grid grid-cols-12 gap-4 w-10/12 p-4'>
			{/* input item */}
			<div className='col-span-6 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase' >Course Title</label>
				<Input size='large' />
			</div>
			<div className='col-span-6 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase' >Category</label>
				<Select size='large'>
					<Select.Option value='demo'>Demo</Select.Option>
				</Select>
			</div>
			<div className='col-span-12 space-y-2'>
				<label className='text-font2 uppercase' >Short Description</label>
				<TextArea rows={2} />
			</div>
			<div className='col-span-6 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase' >Level</label>
				<Select size='large'>
					<Select.Option value='demo'>Demo</Select.Option>
				</Select>
			</div>
			<div className='col-span-6 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase' >Language</label>
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
