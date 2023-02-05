import { Rate } from 'antd';
import { useState } from 'react';
import banner from '../../../../src/images/profile-bg.png'

const CourseDetailBanner = ({ singleCourse }) => {
	const { courseTitle, courseShortDesc, currLearners, averageRating, numberOfReviews } = singleCourse;
	//console.log(singleCourse);
	//rating
	const [value, setValue] = useState(5);
	return (
		<section
			style={{
				background: ` linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${banner}) center/cover no-repeat`,
			}}
			className=' min-h-[55vh] border flex items-center'
		>
			<div className=' grid grid-cols-2 container mx-auto h-full'>
				<div className='text-white space-y-4'>
					{/*-------------------title-------------------------*/}
					<h2 className='text-white text-5xl font-medium tracking-wider w-[400px]'>
						{courseTitle || ''}
					</h2>

					{courseShortDesc ? courseShortDesc : ''}

					{/* ------------------------rating-------------------- */}

					<ul className='flex space-x-4 items-center'>
						<li className='text-sm flex items-center'>
							{averageRating ? (
								<span className='ant-rate-text text-sm'>
									{averageRating}
								</span>
							) : null}
							<Rate
								value={Number(averageRating)}
								style={{ fontSize: '13px' }}
							/>
						</li>

						<li className='text-sm'> ({numberOfReviews})</li>
						<li className='text-sm'> {currLearners?.length} learner </li>
					</ul>
				</div>
				<div className=' '></div>
			</div>
		</section>
	);
};

export default CourseDetailBanner;
