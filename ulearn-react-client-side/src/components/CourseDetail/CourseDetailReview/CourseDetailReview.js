import React, { useEffect, useState } from 'react';
import { Avatar, Rate, Progress, Menu, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './CourseDetailReview.css';
import axios from 'axios';
import Loading from '../../layout/Loading/Loading';
import useAuth from '../../../hooks/useAuth';

const CourseDetailReview = ({ singleCourse, setTriggerFetch }) => {
	const { user } = useAuth();
	const [comment, setComment] = useState('');
	const [updateComment, setUpdateComment] = useState('');
	const [reviews, setReviews] = useState([]);
	const [value, setValue] = useState(3);
	const [updateValue, setUpdateValue] = useState(value);
	const [loading, setLoading] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	//creating reviews
	const handleSubmit = (e) => {
		e.preventDefault();

		if (comment) {
			const data = {
				rating: value,
				comment: comment,
				course: singleCourse._id,
			};
			console.log(data);
			setLoading(true);
			axios
				.post('/reviews', data)
				.then((response) => {
					//	console.log(response.data.review);
					message.success('review added successfully');
					setTriggerFetch(true);
				})
				.catch((err) => {
					console.log(err);
					message.error(err.response.data.msg || err.message);
				})
				.finally(() => {
					setLoading(false);
				});
			setComment('');
		} else {
			message.warning('Please write a comment before posting.');
		}
	};
	//get single course
	useEffect(() => {
		if (singleCourse) {
			setReviews(singleCourse.reviews);
		}
	}, [singleCourse]);
	//review update
	const handleUpdateReview = (userId, reviewId) => {
		//setIsEdit(true);
		console.log('udpate review');
		if (userId !== user?.userId) {
			return;
		} else {
			const data = {
				rating: updateValue,
				comment: updateComment,
				course: singleCourse._id,
			};

			if (data) {
				console.log(data);

				setLoading(true);
				axios
					.patch(`/reviews/${reviewId}`, data)
					.then((response) => {
						console.log(response.data.msg);
						message.success('updated successfully');
						setTriggerFetch(true);
					})
					.catch((err) => {
						console.log(err);
						message.error(err.response.data.msg || err.message);
					})
					.finally(() => {
						setIsEdit(false);
						setLoading(false);
					});
			}
		}
	};
	//delete review
	const handleDeleteReview = (userId, reviewId) => {
		if (userId !== user?.userId) {
			return;
		} else {
			setIsDelete(true);
			axios
				.delete(`/reviews/${reviewId}`)
				.then((response) => {
					console.log(response.data.msg);
					message.success('deleted successfully');
					setTriggerFetch(true);
				})
				.catch((err) => {
					console.log(err);
					message.error(err.response.data.msg || err.message);
				})
				.finally(() => {
					setIsDelete(false);
				});
		}
	};

	const progressBarReviews = [
		{
			id: 0,
			progress: singleCourse?.ratingCount
				? singleCourse?.ratingCount[5]
				: 0,
			rating: 5,
			percent: singleCourse?.ratingCount
				? (Number(singleCourse?.ratingCount[5]) * 100) / 10
				: 0,
		},
		{
			id: 1,
			progress: singleCourse?.ratingCount
				? singleCourse?.ratingCount[4]
				: 0,
			rating: 4,
			percent: singleCourse?.ratingCount
				? (Number(singleCourse?.ratingCount[4]) * 100) / 10
				: 0,
		},
		{
			id: 2,
			progress: singleCourse?.ratingCount
				? singleCourse?.ratingCount[3]
				: 0,
			rating: 3,
			percent: singleCourse?.ratingCount
				? (Number(singleCourse?.ratingCount[3]) * 100) / 10
				: 0,
		},
		{
			id: 3,
			progress: singleCourse?.ratingCount
				? singleCourse?.ratingCount[2]
				: 0,
			rating: 2,
			percent: singleCourse?.ratingCount
				? (Number(singleCourse?.ratingCount[2]) * 100) / 10
				: 0,
		},
		{
			id: 4,
			progress: singleCourse?.ratingCount
				? singleCourse?.ratingCount[1]
				: 0,
			rating: 1,
			percent: singleCourse?.ratingCount
				? (Number(singleCourse?.ratingCount[1]) * 100) / 10
				: 0,
		},
	];

	return (
		<section className='p-10 space-y-8'>
			<div className='grid grid-cols-12'>
				<div className='col-span-4'>
					<span className='block text-[41px] text-[#040453] font-semibold '>
						{singleCourse?.averageRating}
					</span>
					<span>
						<Rate
							disabled
							value={Number(singleCourse?.averageRating)}
							style={{
								fontSize: '13px',
							}}
						/>
					</span>
					<span className='block text-base pt-1'>
						{singleCourse?.numberOfReviews} Review
					</span>
				</div>
				{/* -------------------progress bar----------------------- */}
				<div className='col-span-8 flex flex-col'>
					{progressBarReviews.map((progressValue) => {
						const { id, rating, progress, percent } = progressValue;
						return (
							<div
								key={id}
								className=' flex whitespace-nowrap items-center space-x-2 '
							>
								{' '}
								<span className='block text-base  text-[#040453] font-semibold '>
									{rating}
								</span>
								<Rate defaultValue={Number(rating)} disabled />
								<Progress
									className='course-review-progress-inner-color course-review-progress-outer-color'
									percent={percent}
									// status='5'
									showInfo={false}
								/>
								<span className='block text-base   '>
									{progress}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				{user ? (
					<div className='space-y-4'>
						{/*-----------------------user review section------------------------------*/}
						<form
							onSubmit={handleSubmit}
							className='bg-light p-4 rounded-lg flex flex-col'
						>
							<div className='flex space-x-4'>
								<div className=''>
									<Avatar
										src={user?.avatarURL}
										className='flex'
										size='medium'
									/>
									<span className='block text-sm  text-font1 font-medium'>
										{user?.name}
									</span>
									{/*-----------------------user review---------------------------*/}
									<Rate
										onChange={setValue}
										value={value}
										style={{ fontSize: 18 }}
									/>
								</div>
								{/* form input */}
								<div className='flex-grow form-control'>
									<textarea
										rows={4}
										placeholder='write a review.....'
										name='review'
										className='input input-bordered h-full text-lg'
										value={comment}
										onChange={(e) =>
											setComment(e.target.value)
										}
									/>
								</div>
							</div>

							{/* -----------------post review------------------ */}
							<button
								className='self-end py-2 px-4 font-medium text-primary border border-primary rounded-lg mt-4'
								type='submit'
								disabled={loading}
							>
								{loading ? (
									<span className='flex items-center'>
										<LoadingOutlined />
										<span className='ml-2'>Posting</span>
									</span>
								) : (
									'Post Review'
								)}
							</button>
						</form>
					</div>
				) : null}
				{/*------------------show course reviews---------------------*/}
				<div className='grid grid-rows-1 mt-20 gap-y-4 text-base'>
					{reviews?.length
						? reviews.map((review) => (
								<div
									key={review?._id}
									className='bg-white drop-shadow rounded-lg p-4 space-y-4 flex flex-col justify-between'
								>
									<div className='flex'>
										<Avatar
											src={review?.user?.avatarURL}
											size='large'
											style={{ marginRight: '10px' }}
										></Avatar>
										<div className='flex flex-col'>
											{review?.user?.name}

											{isEdit ? (
												<Rate
													onChange={setUpdateValue}
													value={updateValue}
												/>
											) : (
												<Rate value={review?.rating} />
											)}
										</div>
									</div>
									<div className=''>
										{isEdit &&
										user?.userId === review?.user?._id ? (
											<textarea
												type=''
												cols={100}
												rows={5}
												placeholder='write a review.....'
												name='review'
												className='input input-bordered w-full h-full text-lg pt-2 pl-5'
												value={updateComment}
												onChange={(e) =>
													setUpdateComment(
														e.target.value
													)
												}
											></textarea>
										) : (
											<p>{review?.comment}...</p>
										)}
									</div>
									{user?.userId === review?.user?._id && (
										<div className='flex justify-end pr-5 mt-3'>
											{!isEdit ? (
												<>
													<button
														className='ml-2 border border-red-300  text-red-800  hover:text-white py-1 px-2 rounded hover:bg-red-600 text-sm'
														onClick={() =>
															handleDeleteReview(
																review?.user
																	?._id,
																review._id
															)
														}
													>
														{isDelete ? (
															<span className='flex items-center'>
																<LoadingOutlined />
																<span className='ml-2'>
																	Delete
																</span>
															</span>
														) : (
															'Delete'
														)}
													</button>
													<button
														className='ml-2 border border-blue-300  text-blue-800  hover:text-white px-2 rounded hover:bg-blue-600 text-sm'
														onClick={() =>
															setIsEdit(true)
														}
													>
														Edit
													</button>
												</>
											) : (
												<button
													className='ml-2 border border-green-300  text-green-800  hover:text-white py-1 px-2 rounded hover:bg-green-600 text-sm'
													disabled={loading}
													onClick={() =>
														handleUpdateReview(
															review?.user?._id,
															review._id
														)
													}
												>
													{loading ? (
														<>
															<LoadingOutlined />
															<span className='ml-2'>
																Updating...
															</span>
														</>
													) : (
														'Update'
													)}
												</button>
											)}
										</div>
									)}
								</div>
						  ))
						: null}
				</div>
			</div>
		</section>
	);
};

export default CourseDetailReview;
