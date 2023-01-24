import React, { useRef, useState } from 'react';
import { Input, Upload, message, Spin } from 'antd';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import Loading from '../../../../components/layout/Loading/Loading';

const EditMedia = ({ course, handleUpdateCourse, isUpdating }) => {
	const [courseThumb, setCourseThumb] = useState(null);
	const courseOverviewRef = useRef(course?.courseOverviewVidUrl || '');
	const [fileList, setFileList] = useState([]);

	const props = {
		name: 'image',
		multiple: true,
		listType: 'picture',
		accept: '.png, .jpeg',
		maxCount: 1,
		action: 'https://api.imgbb.com/1/upload?expiration=9999999&key=e2401ff27943b11283409a478fccc412',
		// action: 'http://localhost:5001/api/v1/images/upload',
		iconRender: () => {
			return <Spin />;
		},
		onChange: (info) => {
			const { status } = info.file;
			if (status === 'done') {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
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

	const handleUpdateCourseThumb = (e) => {
		e.preventDefault();
		const newOverView = courseOverviewRef?.current?.input?.value;
		if (!courseThumb && !newOverView) {
			message.warning('Please make changes to update!');
			return;
		} else if (courseThumb || newOverView) {
			const newCourse = {
				...course,
				courseThumb: courseThumb || course.courseThumb,
				courseOverViewVidUrl:
					newOverView || course.courseOverviewVidUrl,
			};
			handleUpdateCourse(newCourse);
			setCourseThumb(null);
		}
	};

	return (
		<>
			<>
				{!course ? (
					<div className='flex justify-center items-center h-[40vh]'>
						<Spin />
					</div>
				) : (
					<form
						onSubmit={handleUpdateCourseThumb}
						className=' border rounded-lg h-fit w-11/12'
					>
						<div className='grid grid-cols-12 gap-4'>
							{/* new data */}
							<div className='col-span-8'>
								<div className='p-4 grid grid-cols-12 gap-4'>
									{/* input item */}
									<div className='col-span-12 space-y-2 flex flex-col'>
										<label className='text-font2 uppercase'>
											Course Overview Video URL (Optional)
										</label>

										<Input
											defaultValue={
												course?.courseOverviewVidUrl
											}
											ref={courseOverviewRef}
											size='large'
										/>
									</div>
									<div className='col-span-12 space-y-2 flex flex-col h-fit'>
										<label className='text-font2 uppercase'>
											Course Thumbnail
										</label>
										<Upload.Dragger
											{...props}
											disabled={isUpdating}
										>
											<p className='ant-upload-drag-icon text-center'>
												<LordIcon
													src='https://cdn.lordicon.com/fgkmrslx.json'
													size={40}
												/>
											</p>
											<p className='ant-upload-text'>
												Click or drag file to this area
												to upload
											</p>
											<p className='ant-upload-hint'>
												Please upload only one picture,
												selecting another will replace
												existing one
											</p>
										</Upload.Dragger>
									</div>
								</div>
							</div>
							{/* prev data */}
							<div className='col-span-4 p-4 space-y-2'>
								<label className='text-font2 uppercase'>
									Current Thumbnail
								</label>
								<hr />
								<img
									className='objet-contain rounded-lg'
									src={course?.courseThumb}
									alt='course'
								/>
							</div>
							<div className='col-span-12 p-4 bg-light'>
								<button
									className='px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
									type='submit'
									disabled={isUpdating}
								>
									{isUpdating ? (
										<span className='flex items-center'>
											<Loading size='small' />{' '}
											<span className='ml-2'>
												Updating...
											</span>
										</span>
									) : (
										'Update Course Media'
									)}
								</button>
							</div>
						</div>
					</form>
				)}
			</>
		</>
	);
};

export default EditMedia;
