import React, { useEffect, useState } from 'react';
import { Avatar, Rate, Progress, Menu } from 'antd';
import './CourseDetailReview.css';
import axios from 'axios';
import { Dropdown, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import useAuthentication from '../../../hooks/useAuthentication';
import { HiOutlineDotsVertical } from 'react-icons/hi';
const progressBarReviews = [
	{
		id: 23,
		reviews: 5,
		progress: 5,
		percent: 100,
	},
	{
		id: 24,
		reviews: 4,
		progress: 4,
		percent: 80,
	},
	{
		id: 25,
		reviews: 4,
		progress: 3,
		percent: 70,
	},
	{
		id: 26,
		reviews: 2,
		progress: 2,
		percent: 60,
	},
	{
		id: 27,
		reviews: 1,
		progress: 1,
		percent: 20,
	},
];

const CourseDetailReview = ({ singleCourse }) => {
	const { user } = useAuthentication();
	const [comment, setComment] = useState('');
	const [reviews, setReviews] = useState([]);
	const [value, setValue] = useState(3);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (comment) {
			const data = {
				rating: value,
				comment: comment,
				course: singleCourse._id,
			};
			console.log(data);
			axios
				.post('/reviews', data)
				.then((response) => {
					console.log(response.data.review);
				})
				.catch((err) => {
					console.log(err);
				});
			setComment('');
		}
	};
	useEffect(() => {
		axios.get(`/courses/${singleCourse._id}`).then((response) => {
			console.log(response.data.course.reviews);
			setReviews(response.data.course.reviews);
		});
	}, []);
	const handleUpdateReview = () => {};
	const handleDeleteReview = () => {};
	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<p className='text-base mt-4 font-semibold bg-white hover:bg-gray-400'>
							Edit
						</p>
					),
					icon: <SmileOutlined />,
				},
				{
					key: '2',
					label: (
						<p className='text-base mt-4 font-semibold'>Delete</p>
					),
					icon: <SmileOutlined />,
				},
			]}
		/>
	);

	return (
		<section className='p-10'>
			<div className='grid grid-cols-12'>
				<div className='col-span-4'>
					<span className='block text-[41px] text-[#040453] font-semibold '>
						5.0
					</span>
					<span>
						<Rate
							disabled
							defaultValue={5}
							style={{
								fontSize: '13px',
							}}
						/>
					</span>
					<span className='block text-base pt-1'>1 Reviews</span>
				</div>
				{/* -------------------progress bar----------------------- */}
				<div className='col-span-8 flex flex-col'>
					{progressBarReviews.map((progressValue) => {
						const { id, reviews, progress, percent } =
							progressValue;
						return (
							<div
								key={id}
								className=' flex whitespace-nowrap items-center space-x-2 '
							>
								{' '}
								<span className='block text-base  text-[#040453] font-semibold '>
									{reviews}
								</span>
								<Rate defaultValue={reviews} />
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
			<div className='flex space-x-3 pt-10'>
				<div>
					<Avatar
						size='large'
						style={{
							background: 'purple',
						}}
					>
						{user ? user?.name.slice(0, 1) : '?'}
					</Avatar>
				</div>
				{/*-----------------------user review section------------------------------*/}
				<form onSubmit={handleSubmit} className=''>
					<div>
						<span className='block text-[21px]  text-[#040453] font-semibold'>
							{user ? user.name : 'username'}
						</span>
						{/*-----------------------user review---------------------------*/}
						<Rate onChange={setValue} value={value} />
					</div>
					{/* form input */}
					<div className='form-control w-full'>
						<label className='label font-medium'></label>
						<textarea
							type=''
							cols={100}
							rows={8}
							placeholder='write a review.....'
							name='review'
							className='input input-bordered w-full h-full text-lg pt-2 pl-5'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>

					{/* -----------------post review------------------ */}
					<button
						className='py-2 px-4 font-medium bg-primary text-white rounded-lg mt-4'
						type='submit'
					>
						post review
					</button>
				</form>
			</div>
			{/*------------------show course reviews---------------------*/}
			<div className='grid grid-rows-1 mt-20 gap-y-10 text-base'>
				{reviews?.length
					? reviews.map((review) => (
							<div className='border border-gray-200 shadow rounded pt-4 pl-4 flex justify-between'>
								<div>
									<Avatar
										size='large'
										style={{ marginRight: '10px' }}
									></Avatar>
									{review.user}
									<p className='ml-12'> {review.comment}</p>
								</div>
								<div className='pr-6'>
									<Dropdown overlay={menu}>
										<a
											href='/xyz'
											onClick={(e) => e.preventDefault()}
										>
											<Space>
												<HiOutlineDotsVertical className='text-black font-extrabold text-xl' />
											</Space>
										</a>
									</Dropdown>
								</div>
							</div>
					  ))
					: ''}
			</div>
		</section>
	);
};

export default CourseDetailReview;
