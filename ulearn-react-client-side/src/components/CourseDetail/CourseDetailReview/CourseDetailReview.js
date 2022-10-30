import React from 'react';
import { Avatar, Rate } from 'antd';
import { Progress } from 'antd';

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

const CourseDetailReview = () => {
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
					<span className='block text-base  text-font2 '>
						2 months ago
					</span>
					<Rate
						defaultValue={5}
						style={{
							fontSize: '13px',
						}}
					/>
					<span className='block text-base  text-font2 '>
						I like this course....
					</span>
				</div>
			</div>
		</section>
	);
};

export default CourseDetailReview;
