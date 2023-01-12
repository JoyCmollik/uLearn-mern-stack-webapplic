import React from 'react';
import { Button, Checkbox, InputNumber, message, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';

const EditPricing = ({ course, handleUpdateCourse, isUpdating }) => {
	const { control, handleSubmit } = useForm({});

	const handleUpdatePrice = (data) => {
		if(course.coursePrice !== data.coursePrice && course.isFree !== data.isFree) {
			console.log(data);
			data.coursePrice = data.isFree ? 0 : data.coursePrice;
			const newCourseData = {...course, ...data};
			handleUpdateCourse(newCourseData);
		} else {
			message.warning('Please make some changes before updating!');
		}
	}
	return (
		<>
			{!course ? (
				<div className='flex justify-center items-center h-[40vh]'>
					<Spin />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(handleUpdatePrice)}
					className=' border rounded-lg h-fit w-11/12'
				>
					<div className='p-4 grid grid-cols-12 gap-4'>
						{/* input item */}
						<div className='col-span-12 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Course Price
							</label>
							<Controller
								name='coursePrice'
								control={control}
								render={({ field }) => (
									<InputNumber
										{...field}
										addonBefore='$'
										addonAfter='USD'
										defaultValue={course.coursePrice}
										style={{
											borderRadius: '8px',
											overflow: 'hidden',
											border: '1px solid #d9d9d9',
										}}
									/>
								)}
							/>
						</div>{' '}
						<div className='col-span-12 space-y-2 flex flex-col'>
							<Controller
								name='isFree'
								control={control}
								defaultValue='true'
								render={({ field }) => (
									<Checkbox {...field}>
										Check if this is a free course.
									</Checkbox>
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
								<>
									<Spin size='small' />{' '}
									<span className='ml-2'>Updating...</span>
								</>
							) : (
								'Update Course Price'
							)}
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default EditPricing;
