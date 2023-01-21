import React from 'react';
import { Avatar, Rate } from 'antd';
import { HiAcademicCap, HiDocumentPlus, HiOutlineClock } from 'react-icons/hi2';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CourseSearchItem = ({ course, setSearchDropOpen }) => {
	const {
		courseThumb,
		courseTitle,
		instructor,
		sections,
		level,
		currLearners,
		averageRating,
		category,
		language,
		createdAt,
		_id,
	} = course;
	return (
		<div key={_id} className='col-span-12'>
			<Link onClick={() => setSearchDropOpen(false)} to={`/course-list/${_id}`}>
				<article
					key={_id}
					className='flex justify-between bg-white drop-shadow rounded-lg overflow-hidden h-[100px] text-font1'
				>
					{/* course image */}

					<img
						src={courseThumb}
						alt='course-thumb'
						className='w-[100px] h-[100px] object-cover'
					/>
					{/* course info */}
					<div className='flex-grow p-4 flex flex-col justify-between space-y-2 relative'>
						<h4 className='text-sm font-medium'>{courseTitle}</h4>
						<div className='space-y-2'>
							<p className='m-0 p-0 text-xs'>
								in{' '}
								<span className='capitalize underline'>
									{' '}
									{category?.name}
								</span>
							</p>
							{/* creator */}
							<div className='flex justify-between items-center text-xs'>
								<div className='flex items-center space-x-1'>
									<Avatar
										size={15}
										src={instructor.avatarURL}
										alt='avatar'
									/>
									<h5 className='m-0 text-font2 capitalize'>
										{instructor.name}
									</h5>
								</div>
								{/* stats */}
								<div className='flex items-center space-x-2 text-xs'>
									<div className='flex items-center'>
										<HiDocumentPlus
											size={16}
											className='inline-block text-base mr-2 text-font2'
										/>
										<span>{sections.length} Section</span>
									</div>
									<span className='w-[0.25px] h-[16px] bg-font2' />
									<div className='flex items-center'>
										<HiAcademicCap
											size={16}
											className='inline-block mr-2 text-font2'
										/>
										<span>
											{currLearners.length} Learners
										</span>
									</div>
								</div>
							</div>
						</div>
						{/* level */}
						<div className='absolute top-0 right-2 bg-blue-400 text-white px-2 py-0.5 rounded-lg text-xs'>
							{level}
						</div>
					</div>
				</article>
			</Link>
		</div>
	);
};

export default CourseSearchItem;
