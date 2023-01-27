import { Avatar } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDesktop } from 'react-icons/ai';
import { BsStar } from 'react-icons/bs';
import { TbCertificate2, TbSchool } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const CourseDetailInstructor = ({ instructor }) => {
	return (
		<div className='p-10'>
			<article className='bg-light rounded-lg p-4 space-y-4'>
				<h2 className='capitalize text-xl text-font1 font-bold font-lato'>
					Meet The Content Creator
				</h2>
				<hr />
				<div className='flex justify-between items-start'>
					{/*------------------about instructor--------------------*/}
					<div className='flex space-x-3 '>
						<Avatar
							src={instructor?.avatarURL}
							size={64}
							className='rounded-full'
						></Avatar>
						<p className='flex space-y-2 items-center flex-col'>
							<span className='block text-base  text-font1 font-semibold'>
								{instructor?.name}
							</span>

							<span className='block text-sm  px-4 py-1 text-violet-800 bg-violet-200 rounded-lg'>
								content creator
							</span>
						</p>
					</div>
					<Link to={`/content-writer-profile/${instructor._id}`}>
						<button className='px-4 py-1 border border-primary rounded-lg text-primary'>
							View Profile
						</button>
					</Link>
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
					{/* ------------------------------------------
					<div className='col-span-2 flex flex-col pt-8'>
						<h4 className='text-base  text-primary font-medium'>
							About Instructor
						</h4>
						<p className='text-base text-font2'>
							About Instructor Freelancers and entrepreneurs
							Freelancers and entrepreneurs use about.me to grow
							their audience and get more <br /> clients. · Create
							a page to present who you are and what you do in one
							link.use about.me to grow their audience <br /> and
							get more clients. · Create a page to present who you
							are and what you do in one link.
						</p>
					</div> */}
				</div>
			</article>
		</div>
	);
};

export default CourseDetailInstructor;
