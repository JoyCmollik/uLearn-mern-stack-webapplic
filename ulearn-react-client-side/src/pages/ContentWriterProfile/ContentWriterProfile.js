import { Divider, Rate } from 'antd';
import React, { useState } from 'react';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import './ContentWriterProfile.css';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import { Tabs } from 'antd';
import CourseCard from '../../components/Home/AllCourses/CourseCard';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { Footer } from 'antd/lib/layout/layout';
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
	const [value, setValue] = useState(4);

	const details = [
		{
			id: 10,
			img: 'https://lms.rocket-soft.org/assets/default/img/profile/students.svg',
			noOfStudents: 5,
			borderColor: 'border-[#ef9d69]',
			title: 'students',
		},
		{
			id: 11,
			img: 'https://lms.rocket-soft.org/assets/default/img/profile/students.svg',
			noOfCourse: 4,
			borderColor: 'border-[#00a1d9]',
			title: 'courses',
		},
		{
			id: 12,
			img: 'https://lms.rocket-soft.org/assets/default/img/profile/students.svg',
			noOfReviews: 3,
			borderColor: 'border-[#4fb949]',
			title: 'Reviews',
		},
		{
			id: 13,
			img: 'https://lms.rocket-soft.org/assets/default/img/profile/students.svg',
			noOfReviews: 3,
			borderColor: 'border-[#a855ff]',
			title: 'categories',
		},
	];
	return (
		<section className='bg-white  '>
			{/* navigation bar */}
			<NavigationBar theme='light' />
			{/*----------------------background image----------------------------------------------*/}
			<div style={backgroundImage} className='min-h-[55vh]'></div>
			{/*----------------------Instructor Details----------------------------------------------*/}
			<div className='container mx-auto border rounded-lg -mt-72 bg-white shadow-md'>
				<div className='flex space-x-4 items-center p-4'>
					{/*------------------------------instructorImage--------------------------------------------*/}
					<div>
						<img
							src='	https://lms.rocket-soft.org/store/1016/avatar/617a4f17c8e72.png'
							alt='instructor-img'
							className='rounded-full w-[300px] h-[300px] object-cover'
						/>
					</div>
					{/*------------------------------instructorImage--------------------------------------------*/}
					<div className='space-y-2 '>
						{/*--------------name-------------*/}
						<h2 className='text-3xl text-font1 font-bold tracking-wider capitalize'>
							Ricardo dave
						</h2>
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
				<div className='space-x-2 space-y-2'>
					<Divider />
					<div className='grid grid-cols-4 '>
						{details.map((detail) => {
							const {
								img,
								id,
								noOfCourse,
								noOfReviews,
								borderColor,
								noOfStudents,
								title,
							} = detail;
							return (
								<div key={id} className='mx-auto '>
									<div
										className={`shadow-md inline-block border-[3px] rounded-md ${
											borderColor ? borderColor : ''
										} `}
									>
										<img
											src={img}
											alt=''
											className='rounded object-cover w-[80px] p-4'
										/>
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
							);
						})}
					</div>
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
											Degree Title:
										</p>
										<p className='text-lg text-font2'>
											Institution Name :
										</p>
										<p className='text-lg text-font2'>
											{' '}
											Passing Year
										</p>
									</div>
									{/* about */}
									<div>
										<h2 className='text-font1 text-xl font-semibold'>
											About
										</h2>
										<p className='text-lg text-font2'>
											Ricardo dave has a BS and MS in
											Mechanical Engineering from Santa
											Clara University and years of
											experience as a professional
											instructor and trainer for Data
											Science and programming. He has
											publications and patents in various
											fields such as microfluidics,
											materials science, and data science
											technologies. Over the course of his
											career he has developed a skill set
											in analyzing data and he hopes to
											use his experience in teaching and
											data science to help other people
											learn the power of programming the
											ability to analyze data, as well as
											present the data in clear and
											beautiful visualizations. Currently
											he works as the Head of Data Science
											for Pierian Data Inc. and provides
											in-person data science and python
											programming training courses to
											employees working at top companies,
											including General Electric, Cigna,
											The New York Times, Credit Suisse,
											McKinsey and many more. Feel free to
											contact him on LinkedIn for more
											information on in-person training
											sessions or group training sessions
											in Las Vegas, NV.
										</p>
									</div>
									{/* skillset */}
									<div>
										<h2 className='text-font1 text-xl font-semibold'>
											About
										</h2>
										<div className='flex space-x-3 '>
											<p className='text-lg  bg-gray-300 rounded pt-2 px-3'>
												Design Web
											</p>
											<p className='text-lg  bg-gray-300 rounded pt-2 px-3'>
												{' '}
												Development
											</p>
											<p className='text-lg  bg-gray-300 rounded pt-2 px-3'>
												Mobile Development
											</p>
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
