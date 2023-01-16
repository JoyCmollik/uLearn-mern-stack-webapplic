import { Rate } from 'antd';
import { useState } from 'react';

const CourseDetailBanner = ({ singleCourse }) => {
	const { courseTitle, courseShortDesc, courseMetaDesc } = singleCourse;
	//console.log(singleCourse);
	//rating
	const [value, setValue] = useState(5);
	return (
		<section
			style={{
				backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('https://lms.rocket-soft.org/store/929/update_1.6_c.jpg')`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			className=' min-h-screen  border flex items-center  '
		>
			<div className=' grid grid-cols-2 container mx-auto h-full'>
				<div className='text-white     '>
					{/*-------------------title-------------------------*/}
					<h2 className='text-white text-5xl font-medium tracking-wider w-[400px]'>
						{courseTitle || ''}
					</h2>

					{courseShortDesc ? courseShortDesc : ''}

					<p>Johnny Depp | Level 1</p>
					{/* ------------------------rating-------------------- */}

					<ul className='flex space-x-4 items-center'>
						<li className='text-sm flex items-center'>
							{value ? (
								<span className='ant-rate-text text-sm'>
									{value}.0
								</span>
							) : (
								''
							)}
							<Rate
								onChange={setValue}
								value={value}
								style={{ fontSize: '13px' }}
							/>
						</li>

						<li className='text-sm'> (1)</li>
						<li className='text-sm'> 2 students</li>
					</ul>
				</div>
				<div className='2 '></div>
			</div>
		</section>
	);
};

export default CourseDetailBanner;
