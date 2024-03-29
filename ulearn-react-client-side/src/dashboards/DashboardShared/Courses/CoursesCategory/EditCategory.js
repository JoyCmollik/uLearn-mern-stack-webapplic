import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, PageHeader, Result, Spin, Upload } from 'antd';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
// import addCategory from '../../../../images/add_document.png';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../../components/layout/Loading/Loading';

const EditCategory = ({ isLoading, handleUpdateCategory }) => {
	const [isFetching, setIsFetching] = useState(true);
	const [category, setCategory] = useState(null);
	const categoryThumbRef = useRef('');

	// library constants
	const { id } = useParams();
	const { control, handleSubmit, reset } = useForm();

	// ON MOUNT DATA FETCHING
	useEffect(() => {
		setIsFetching(true);
		axios
			.get(`/categories/${id}`)
			.then((response) => {
				console.log(response.data);
				setCategory(response.data.category);
			})
			.catch((error) => {
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

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
				categoryThumbRef.current = info.file.response.data.display_url;
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

	const onSubmit = async (data) => {
		if (data.category) {
			data.categoryURL = categoryThumbRef.current
				? categoryThumbRef.current
				: category.categoryURL;
			const newCategoryData = { ...category, ...data };
			console.log(newCategoryData);
			const isCreated = await handleUpdateCategory(newCategoryData);
			if (isCreated) {
				reset();
				categoryThumbRef.current = '';
			}
		} else {
			message.warning('Both title and image must be inputted');
		}
	};

	return (
		<div className='border-[0.5px] rounded-lg overflow-hidden '>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Update a new category'
				subTitle='if you go back, no changes are saved....'
			>
				{isFetching ? (
					<div className='flex justify-center items-center h-[40vh]'>
						<Spin />
					</div>
				) : (
					<>
						{!category ? (
							<Result
								status='500'
								title='500'
								subTitle='Sorry, something went wrong. Please try again.'
								extra={
									<Button
										onClick={() => window.history.back()}
										type='primary'
									>
										Go Back
									</Button>
								}
							/>
						) : (
							<div className='grid grid-cols-12 min-h-[25vh] rounded-lg p-4'>
								<div className='col-span-5 bg-white'>
									<form
										onSubmit={handleSubmit(onSubmit)}
										className='grid grid-cols-12 gap-4 p-8 bg-light rounded-lg'
									>
										{/* input item */}
										<div className='col-span-12 space-y-2 flex flex-col'>
											<label className='text-font2 uppercase'>
												Category Title
											</label>
											<Controller
												name='category'
												control={control}
												defaultValue={category.category}
												render={({ field }) => (
													<Input
														{...field}
														size='large'
													/>
												)}
											/>
										</div>
										<div className='col-span-12 space-y-2 flex flex-col h-fit'>
											<label className='text-font2 uppercase'>
												Category Thumbnail
											</label>
											<Upload.Dragger {...props}>
												<p className='ant-upload-drag-icon text-center'>
													<LordIcon
														src='https://cdn.lordicon.com/fgkmrslx.json'
														size={40}
													/>
												</p>
												<p className='ant-upload-text'>
													Click or drag file to this
													area to upload
												</p>
												<p className='ant-upload-hint'>
													Please select only one
													picture.
												</p>
											</Upload.Dragger>
										</div>
										<Button
											className='col-span-12 mt-4 disabled:bg-opacity-25'
											type='primary'
											disabled={isLoading}
										>
											{!isLoading ? (
												<input
													className='cursor-pointer'
													type='submit'
													value='Update Category'
												/>
											) : (
												<span className='flex items-center'>
													<Loading size='small' />
													<span className='ml-2'>
														Updating Category...
													</span>
												</span>
											)}
										</Button>
									</form>
								</div>
								<div className='col-span-7'>
									{/* <img
										className='object-cover w-10/12 mx-auto'
										src={addCategory}
										alt='add-category'
									/> */}
								</div>
							</div>
						)}
					</>
				)}
			</PageHeader>
		</div>
	);
};

export default EditCategory;
