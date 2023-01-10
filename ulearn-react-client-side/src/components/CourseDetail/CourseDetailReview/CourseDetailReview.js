import React, { useState } from 'react';
import {
	Avatar,
	Comment,
	Rate,
	Button,
	Form,
	Input,
	List,
	Progress,
} from 'antd';

import moment from 'moment';
import axios from 'axios';
const progressBarReviews = [
	{
		id: 23,
		reviews: 5,
		progress: 1,
		percent: 100,
		from: '#5E3FD7',
		To: '#5E3FD7',
	},
	{
		id: 24,
		reviews: 4,
		progress: 0,
		percent: 100,
		from: '#EEEBEB',
		To: '#EEEBEB',
	},
	{
		id: 25,
		reviews: 3,
		progress: 0,
		percent: 100,
		from: '#EEEBEB',
		To: '#EEEBEB',
	},
	{
		id: 26,
		reviews: 2,
		progress: 0,
		percent: 100,
		from: '#EEEBEB',
		To: '#EEEBEB',
	},
	{
		id: 27,
		reviews: 1,
		progress: 0,
		percent: 100,
		from: '#EEEBEB',
		To: '#EEEBEB',
	},
];
const { TextArea } = Input;
/* const CommentList = ({ comments }) => (
	<List
		className='courseDetailCommentAuthorName courseDetail-author-time'
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? 'replies' : 'reply'
		}`}
		itemLayout='horizontal'
		renderItem={(props) => <Comment {...props} />}
	/>
); */
const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea
				rows={8}
				onChange={onChange}
				value={value}
				style={{
					border: '1px solid #dfdddc',
					borderRadius: '8px',
					paddingLeft: '16px',
					paddingTop: '20px',
					fontSize: '16px',
					color: '#222',
				}}
				placeholder='comment...'
				className=''
			/>
		</Form.Item>
		<Form.Item>
			<Button
				htmlType='submit'
				loading={submitting}
				onClick={onSubmit}
				type='primary'
			>
				Add Review
			</Button>
		</Form.Item>
	</>
);

const CourseDetailReview = ({ singleCourse }) => {
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState('');
	const [rateValue, setRateValue] = useState(3);

	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);

		const data = {
			rating: rateValue,
			comment: value,
			course: singleCourse._id,
		};
		console.log(data);
		axios
			.post('/reviews', data)
			.then((response) => {
				console.log(response.data.review);

				const reviews = [];
				reviews.push(response.data.review._id);
				handleUpdateCourse({ reviews });
			})
			.catch((err) => {
				console.log(err);
			});

		setSubmitting(false);
		setValue('');
	};

	const handleUpdateCourse = (data) => {
		axios
			.patch(`/courses/${singleCourse._id}`, data)
			.then((response) => {
				console.log(response.data.course);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
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
						const { id, reviews, progress, percent, from, To } =
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
									percent={percent}
									// status='5'
									showInfo={false}
									strokeColor={{
										from: `${from}`,
										to: `${To}`,
									}}
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
				<Avatar
					src='https://lmszai.zainikthemes.com/uploads_demo/user/student-avatar.jpg'
					size={64}
					className='rounded-full'
				></Avatar>
				<div>
					<span className='block text-[21px]  text-[#040453] font-semibold'>
						Will Smith
					</span>
					{/* 	<span className='block text-base  text-font2 '>
						2 months ago
					</span> */}
					<Rate
						//defaultValue={}
						onChange={setRateValue}
						value={rateValue}
						style={{
							fontSize: '13px',
						}}
					/>
				</div>
			</div>
			{/*-----------------------comment section------------------------------*/}
			<div className='text-base'>
				{/* {comments.length > 0 && <CommentList comments={comments} />} */}
				<Comment
					/* 	avatar={
					<Avatar
						src='https://joeschmoe.io/api/v1/random'
						alt='Han Solo'
					/>
				} */
					content={
						<Editor
							onChange={handleChange}
							onSubmit={handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</div>
		</section>
	);
};

export default CourseDetailReview;
