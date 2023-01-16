import { Avatar } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDesktop } from 'react-icons/ai';
import { BsStar } from 'react-icons/bs';
import { TbCertificate2, TbSchool } from 'react-icons/tb';

const CourseDetailInstructor = ({ instructor }) => {
	const [user, setUser] = useState({});
	useEffect(() => {
		axios
			.get(`/users/${instructor}`)
			.then((response) => {
				console.log(response.data.user);
				setUser(response.data.user);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className='p-10'>
			<h4 className='text-[21px] text-primary font-semibold capitalize'>
				Meet The Content Creator
			</h4>
			<div className='grid grid-cols-2'>
				{/*------------------about instructor--------------------*/}
				<div className='flex space-x-3 '>
					<Avatar
						src={user.avatarURL}
						size={64}
						className='rounded-full'
					></Avatar>
					<p className='flex space-y-2 items-center flex-col'>
						<span className='block text-[21px]  text-primary font-semibold'>
							{instructor.name}
						</span>

						<span className='block text-sm  px-4 py-1 text-violet-800 bg-violet-200 rounded-lg'>
							content creator
						</span>
					</p>
				</div>
				{/*----------------course info--------------------*/}
				{/* <div className='flex space-x-5 pl-4 border items-center rounded-lg'>
					<div className='flex flex-col space-y-3'>
						<span className='flex items-center  text-base text-[#040453] '>
							<BsStar className='inline mr-3' />
							5.0 Rating
						</span>
						<span className='flex items-center  text-base text-[#040453] '>
							<TbSchool className='inline mr-3' />
							Students
						</span>
					</div>
					<div className='flex flex-col space-y-3'>
						<span className='flex items-center  text-base text-[#040453] '>
							<TbCertificate2 className='inline mr-3' />
							Level 1
						</span>
						<span className='flex items-center  text-base text-[#040453] '>
							<AiOutlineDesktop className='inline mr-3' />
							Courses
						</span>
					</div>
				</div> */}
				{/*------------------------------------------*/}
				<div className='col-span-2 flex flex-col pt-8'>
					<h4 className='text-base  text-primary font-medium'>
						About Instructor
					</h4>
					<p className='text-base text-font2'>
						About Instructor Freelancers and entrepreneurs
						Freelancers and entrepreneurs use about.me to grow their
						audience and get more <br /> clients. · Create a page to
						present who you are and what you do in one link.use
						about.me to grow their audience <br /> and get more
						clients. · Create a page to present who you are and what
						you do in one link.
					</p>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailInstructor;
