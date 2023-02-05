import React, { useState } from 'react';
import { Button, Input, Upload, message, Spin } from 'antd';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};

const AddMedia = ({ handleActiveTab, control, setCourseThumb }) => {
	// alternative image upload option
	// const handleUploadImageToCloudinary = async (imgFile) => {
	// 		axios
	// 			.post('/images/upload', {
	// 				file: imgFile,
	// 			})
	// 			.then((response) => {
	// 				if (response.data.image.src) {
	// 					setCourseThumb(() => response.data.image.src);
	// 					message.success('Image has been uploaded.')
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				message.error(error.response.data.msg || error.message);
	// 			});

	// };

	const props = {
		name: 'image',
		multiple: true,
		listType: 'picture',
		accept: '.png, .jpeg',
		maxCount: 1,
		action: 'https://api.imgbb.com/1/upload?expiration=9999999999&key=e2401ff27943b11283409a478fccc412',
		// beforeUpload: (file) => {
		// 	getBase64(file, (url) => {
		// 		handleUploadImageToCloudinary(url);
		// 	});
		// 	return false;
		// },
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
		<div className='wrapper border rounded-lg  w-11/12'>
			<div className='grid grid-cols-12 gap-4 p-4 h-full'>
				{/* input item */}
				<div className='col-span-12 space-y-2 flex flex-col'>
					<label className='text-font2 uppercase'>
						Course Overview Video URL (Optional)
					</label>
					<Controller
						name='courseOverviewVidUrl'
						control={control}
						render={({ field }) => (
							<Input {...field} size='large' />
						)}
					/>
				</div>
				<div className='col-span-12 space-y-2 flex flex-col h-fit'>
					<label className='text-font2 uppercase'>
						Course Thumbnail
					</label>
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
							Please upload only one picture, selecting another
							will replace existing one
						</p>
					</Upload.Dragger>
				</div>
			</div>
			<div className='flex justify-end items-center bg-light p-4 space-x-2'>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleActiveTab('3');
					}}
					className='px-5 py-2 text-primary border border-primary rounded-lg flex items-center space-x-2'
					type='primary'
				>
					<span>
						<HiArrowLeft />
					</span>{' '}
					<span>Back</span>
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleActiveTab('5');
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

export default AddMedia;
