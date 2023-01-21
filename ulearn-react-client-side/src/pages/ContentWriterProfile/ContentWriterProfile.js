import { Divider, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import './ContentWriterProfile.css';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import { Tabs } from 'antd';
import CourseCard from '../../components/Home/AllCourses/CourseCard';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { Footer } from 'antd/lib/layout/layout';
import { useParams } from 'react-router-dom';
import { IoSchoolOutline } from 'react-icons/io5';
import { GoBook } from 'react-icons/go';
import { VscPreview } from 'react-icons/vsc';
import { MdOutlineCategory } from 'react-icons/md';

import axios from 'axios';
const onChange = (key) => {
	console.log(key);
};
const courses = [
	{
		_id: '31',
		courseTitle: 'Wordpress for Beginners - Master Wordpress Quickly',
		averageRating: '5',
		instructor: '',
		courseThumb: 'https://i.ibb.co/XYcMW7p/business-thumbnail.jpg',
		sections: ['1', '2'],
		level: 'beginner',
	},
	{
		_id: '32',
		courseTitle: 'Wordpress for Beginners - Master Wordpress Quickly',
		averageRating: '5',
		instructor: '',
		courseThumb: 'https://i.ibb.co/XYcMW7p/business-thumbnail.jpg',
		sections: ['1', '2'],
		level: 'beginner',
	},
];
const backgroundImage = {
	backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('https://lms.rocket-soft.org/store/1016/7.jpg')`,
};
const ContentWriterProfile = () => {
	const { contentWriterId } = useParams();
	const [user, setUser] = useState({});
	const [value, setValue] = useState(4);
	const [instructor, setInstructor] = useState([]);
	useEffect(() => {
		if (contentWriterId) {
			axios
				.get(`/users/${contentWriterId}`)
				.then((response) => {
					setUser(response.data.user);
					setInstructor(response.data.user.instructor);
					console.log(response.data.user);
				})
				.catch((err) => console.log(err));
		}
	}, []);
	const [contentWriter] = instructor;
	const details = [
		{
			id: 10,
			icon: (
				<IoSchoolOutline className='text-6xl text-[#ef9d69] p-1 mx-auto' />
			),
			noOfStudents: 5,
			borderColor: 'border-[#ef9d69]',
			title: 'students',
		},
		{
			id: 11,
			icon: <GoBook className='text-6xl text-[#00a1d9] p-1 mx-auto' />,
			noOfCourse: 4,
			borderColor: 'border-[#00a1d9]',
			title: 'courses',
		},
		{
			id: 12,
			icon: (
				<VscPreview className='text-6xl text-[#4fb949] p-1 mx-auto' />
			),
			noOfReviews: 3,
			borderColor: 'border-[#4fb949]',
			title: 'Reviews',
		},
		{
			id: 13,
			icon: (
				<MdOutlineCategory className='text-6xl text-[#a855ff] p-1 mx-auto' />
			),
			noOfReviews: 3,
			borderColor: 'border-[#a855ff]',
			title: 'Category',
		},
	];
	return (
		<section className='bg-white  '>
			{/* navigation bar */}
			<NavigationBar theme='light' />
			{/*----------------------background image----------------------------------------------*/}
			<div style={backgroundImage} className='min-h-[55vh]'></div>
			{/*----------------------Instructor Details----------------------------------------------*/}
			<div className='container mx-auto border rounded-lg -mt-60 bg-white shadow-md p-8 space-y-4'>
				<div className='flex space-x-8 items-center mx-auto  '>
					{/*------------------------------instructorImage--------------------------------------------*/}
					<div className=''>
						<img
							src={user?.avatarURL}
							alt='instructor-img'
							className='rounded-full w-[200px] h-[200px] object-cover'
						/>
					</div>
					{/*------------------------------instructorImage--------------------------------------------*/}
					<div className='space-y-2 '>
						{/*--------------name-------------*/}
						<h2 className='text-xl text-font1 font-bold tracking-wider capitalize'>
							{user?.name}
						</h2>
						<p className='text-base text-font1  tracking-wider font-medium'>
							{user?.email}
						</p>
						{/*--------------rating-------------*/}
						<div>
							<Rate
								style={{
									fontSize: '28px',
								}}
								value={value}
								onChange={setValue}
							/>
							<p className='bg-primary inline-block text-white px-2 rounded'>
								4.58
							</p>
						</div>

						{/* social medial link */}
						<div className='flex text-3xl text-primary space-x-2'>
							<FaFacebookSquare />
							<FaLinkedin />
							<FaTwitterSquare />
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-4 '>
					{details.map((detail) => {
						const {
							icon,
							id,
							noOfCourse,
							noOfReviews,

							noOfStudents,
							title,
						} = detail;
						return (
							<div key={id}>
								<div className='mx-auto border-[0.5px] rounded-lg shadow'>
									<div>
										<div className=' flex items-center justify-center'>
											{icon}
										</div>
									</div>
									<div className='text-center'>
										<h4 className='text-font1 text-xl font-bold '>
											{noOfCourse ||
												noOfReviews ||
												noOfStudents}
										</h4>
										<p className='text-font2 text-xl  capitalize'>
											{title}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{/*--------------------------tabs-----------------------------*/}
			<div className='container mx-auto mt-10 border rounded-lg shadow-lg mb-20'>
				<Tabs
					className='instructorTabStyle instructor-detail-active-color instructor-detail-tabs-ink-bar instructor-detail-tabs-btn instructor-detail-tabs-nav-wrap instructor-detail-tabs-tab'
					defaultActiveKey='1'
					items={[
						{
							label: `About`,
							key: '1',
							children: (
								<section className='p-4'>
									{/* education */}
									<div>
										<h2 className='text-font1 text-xl font-semibold'>
											Education
										</h2>
										<p className='text-lg text-font2'>
											Degree Title:{' '}
											{instructor?.length &&
												contentWriter.degreeTitle}
										</p>
										<p className='text-lg text-font2'>
											Institution Name :
											{instructor?.length &&
												contentWriter.institutionName}
										</p>
										<p className='text-lg text-font2'>
											{' '}
											Passing Year :{' '}
											{instructor?.length &&
												contentWriter.approxPassingYear}
										</p>
									</div>
									{/* about */}
									<div>
										<h2 className='text-font1 text-xl font-semibold'>
											About
										</h2>
										<p className='text-lg text-font2'>
											{instructor?.length &&
												contentWriter.aboutYou}
										</p>
									</div>
									{/* skillset */}
									<div>
										<h2 className='text-font1 text-xl font-semibold'>
											Skill Sets
										</h2>
										<div className='flex space-x-3 '>
											{instructor?.length &&
												contentWriter?.skillSets.map(
													(skill, index) => (
														<p
															key={index}
															className='text-lg  bg-gray-200 rounded pt-2 px-3'
														>
															{skill}
														</p>
													)
												)}
										</div>
									</div>
								</section>
							),
						},
						{
							label: `Courses`,
							key: '2',
							children: (
								<div className='p-4 mx-auto grid grid-cols-4  gap-4'>
									{courses.map((course) => (
										<CourseCard
											course={course}
											key={course._id}
										/>
									))}
								</div>
							),
						},
					]}
					onChange={onChange}
				/>
			</div>
			<Footer style={{ background: '#040453' }}>
				<FooterComponent />
			</Footer>
		</section>
	);
};

export default ContentWriterProfile;
