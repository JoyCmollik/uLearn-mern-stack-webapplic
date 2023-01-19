import React, { useState } from 'react';
import { Button, Input, Upload, message, Spin } from 'antd';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import { Controller } from 'react-hook-form';

const AddMedia = ({ handleActiveTab, control, setCourseThumb }) => {
	const [file, setFile] = useState('');

	const props = {
		name: 'image',
		multiple: true,
		listType: 'picture',
		accept: '.png, .jpeg',
		maxCount: 1,
		action: 'https://api.imgbb.com/1/upload?expiration=9999999999&key=e2401ff27943b11283409a478fccc412',
		// action: 'http://localhost:5001/api/v1/images/upload',
		iconRender: () => {
			return <Spin />;
		},
		onChange: (info) => {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
				console.log(info.file.response);
				setCourseThumb(() => info.file.response.data.display_url);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		progress: {
			strokeWidth: 2.5,
			strokeColor: { '0%': '#f0f', '100%': '#ff0' },
			showInfo: false,
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	// const handleBeforeUpload = (file) => {
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onloadend = () => {
	// 		console.log(reader.result);
	// 		setFile(() => reader.result);
	// 	};
	// 	return file;
	// };

	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4 h-full'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>
					Course Overview Video URL (Optional)
				</label>
				<Controller
					name='courseOverviewVidUrl'
					control={control}
					render={({ field }) => <Input {...field} size='large' />}
				/>
			</div>
			<div className='col-span-12 space-y-2 flex flex-col h-fit'>
				<label className='text-font2 uppercase'>Course Thumbnail</label>
				<Upload.Dragger {...props}>
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
						Please upload only one picture, selecting another will
						replace existing one
					</p>
				</Upload.Dragger>
			</div>
			<Button
				onClick={() => handleActiveTab('5')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddMedia;
