import { Rate } from 'antd';
import { useState } from 'react';

const CourseDetailBanner = ({ singleCourse }) => {
	const { courseTitle, courseShortDesc, courseMetaDesc } = singleCourse;
	//console.log(singleCourse);
	//rating
	const [value, setValue] = useState(5);
	return (
		<section className='bg-gradient-to-r from-[#020024] to-[#090979] min-h-[55vh] border flex items-center'>
			<div className=' grid grid-cols-2 container mx-auto h-full'>
				<div className='text-light     '>
					{/*-------------------title-------------------------*/}
					<h2 className='text-light text-5xl font-medium tracking-wider w-[400px]'>
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
				<div className=' '></div>
			</div>
		</section>
	);
};

export default CourseDetailBanner;
