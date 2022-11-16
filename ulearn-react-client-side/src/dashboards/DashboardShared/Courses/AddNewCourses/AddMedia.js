import React from 'react';
import { Button, Input, Upload } from 'antd';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';

const AddMedia = ({ handleActiveTab }) => {
	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Overview URL</label>
				<Input size='large' name='title' />
			</div>
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Thumbnail</label>
				<Upload.Dragger name='files' >
					<p className='ant-upload-drag-icon text-center'>
						<LordIcon
							src='https://cdn.lordicon.com/fgkmrslx.json'
							size={40}
						/>
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
					<p className='ant-upload-hint'>
						Support for a single or bulk upload.
					</p>
				</Upload.Dragger>
			</div>
			<Button
				onClick={() => handleActiveTab('6')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddMedia