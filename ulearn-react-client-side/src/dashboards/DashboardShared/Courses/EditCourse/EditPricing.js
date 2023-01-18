import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, InputNumber, message, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import Loading from '../../../../components/layout/Loading/Loading';

const EditPricing = ({ course, handleUpdateCourse, isUpdating }) => {
	const [isFree, setIsFree] = useState(true);
	const [coursePrice, setCoursePrice] = useState(course.coursePrice);
	// changes made to this file

	useEffect(() => {
		if (course) {
			setIsFree(course.isFree);
			setCoursePrice(course.coursePrice);
		}
	}, [course]);

	const handleUpdatePrice = (e) => {
		e.preventDefault();

		if (coursePrice == 0 && !isFree) {
			message.warning('Please input a valid price or check it as free!');
			return;
		}

		let data = {};
		data.coursePrice = isFree ? 0 : coursePrice;
		data.isFree = isFree;

		if (course.coursePrice === coursePrice && course.isFree === isFree) {
			message.warning('Please make some changes before updating!');
			return;
		}
		console.log(data, 'after');
		const newCourseData = { ...course, ...data };
		handleUpdateCourse(newCourseData);
	};

	return (
		<>
			{!course ? (
				<div className='flex justify-center items-center h-[40vh]'>
					<Spin />
				</div>
			) : (
				<form
					onSubmit={handleUpdatePrice}
					className=' border rounded-lg h-fit w-11/12'
				>
					<div className='p-4 grid grid-cols-12 gap-4'>
						{/* input item */}
						<div className='col-span-12 space-y-2 flex flex-col'>
							<label className='text-font2 uppercase'>
								Course Price
							</label>
							{!isFree && (
								<InputNumber
									addonBefore='$'
									addonAfter='USD'
									defaultValue={coursePrice}
									onChange={(value) => {
										setCoursePrice(value);
									}}
									style={{
										borderRadius: '8px',
										overflow: 'hidden',
										border: '1px solid #d9d9d9',
									}}
								/>
							)}
						</div>{' '}
						<div className='col-span-12 space-y-2 flex flex-col'>
							<Checkbox
								onChange={(e) => {
									e.preventDefault();
									setIsFree(e.target.checked);
								}}
								defaultChecked={course.isFree}
								checked={isFree}
							>
								<p className='m-0'>
									Check if this is a free course.{' '}
								</p>
								<small className='font-light'>
									(clicking this will remove the pricing)
								</small>
							</Checkbox>
						</div>
					</div>
					<div className='p-4 bg-light'>
						<button
							className='px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
							type='submit'
							disabled={isUpdating}
						>
							{isUpdating ? (
								<span className='flex items-center'>
									<Loading size='small' />{' '}
									<span className='ml-2'>Updating...</span>
								</span>
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
