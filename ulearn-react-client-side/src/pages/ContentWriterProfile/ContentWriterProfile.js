import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import './ContentWriterProfile.css';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import { Tabs } from 'antd';
import CourseCard from '../../components/Home/AllCourses/CourseCard';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { useParams } from 'react-router-dom';
import { GoBook } from 'react-icons/go';
import { VscPreview } from 'react-icons/vsc';
import { MdOutlineCategory } from 'react-icons/md';

import axios from 'axios';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import { HiOutlineAcademicCap, HiOutlineCheck, HiOutlineUserGroup } from 'react-icons/hi2';
import Loading from '../../components/layout/Loading/Loading';
const onChange = (key) => {
	console.log(key);
};

const ContentWriterProfile = () => {
	const { contentWriterId } = useParams();
	const [instructor, setInstructor] = useState(null);
	useEffect(() => {
		if (contentWriterId) {
			axios
				.get(`/instructors/${contentWriterId}`)
				.then((response) => {
					setInstructor(response.data.instructor);
				})
				.catch((err) => console.log(err));
		}
	}, []);
	const details = [
		{
			id: 10,
			icon: (
				<div className='p-3 border-2 border-[#ef9d69] rounded-lg drop-shadow '>
					<HiOutlineAcademicCap
						size={34}
						className='text-[#ef9d69]'
					/>
				</div>
			),
			noOfStudents: instructor?.courses?.length > 0
				? instructor?.courses?.reduce((accumulator, currValue) => currValue?.currLearners?.length + accumulator,0)
				: 0,
			borderColor: 'border-[#ef9d69]',
			title: 'students',
		},
		{
			id: 11,
			icon: (
				<div className='p-3 border-2 border-[#00a1d9] rounded-lg drop-shadow '>
					<HiOutlineUserGroup size={34} className='text-[#00a1d9]' />
				</div>
			),
			noOfCourse: instructor?.courses?.length
				? instructor?.courses?.length
				: 0,
			borderColor: 'border-[#00a1d9]',
			title: 'courses',
		},
		{
			id: 12,
			icon: (
				<div className='p-3 border-2 border-[#4fb949] rounded-lg drop-shadow '>
					<VscPreview size={34} className='text-[#4fb949]' />
				</div>
			),
			noOfReviews: instructor?.courses?.length > 0
				? instructor?.courses?.reduce((accumulator, currValue) => currValue?.numberOfReviews + accumulator,0)
				: 0,
			borderColor: 'border-[#4fb949]',
			title: 'Reviews',
		},
		{
			id: 13,
			icon: (
				<div className='p-3 border-2 border-[#a855ff] rounded-lg drop-shadow '>
					<MdOutlineCategory size={34} className='text-[#a855ff]' />
				</div>
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
			<div className='h-[34vh] bg-light relative'>
				<div className='w-full h-full bg-profileBg bg-cover bg-center bg-no-repeat pt-[8vh] flex justify-center items-start'>
					<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
						<h3 className='text-2xl text-center text-white'>
							Profile
						</h3>
						<BreadcrumbComponents />
					</div>
				</div>
			</div>
			<div
				className='bg-white'
				style={{ minHeight: 'calc(75vh - 81px)' }}
			>
				{!instructor ? (
					<div className='h-[40vh] flex justify-center items-center'>
						<Loading />
					</div>
				) : (
					<>
						{/* container */}
						<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg p-4 drop-shadow'>
							{/*----------------------Instructor Details----------------------------------------------*/}
							<div className='rounded-lg bg-white p-4 space-y-8'>
								<div className='flex space-x-8 items-center mx-auto  '>
									{/*------------------------------instructorImage--------------------------------------------*/}
									<div className=''>
										<img
											src={instructor?.user?.avatarURL}
											alt='instructor-img'
											className='rounded-full w-[200px] h-[200px] object-cover'
										/>
									</div>
									{/*------------------------------instructorImage--------------------------------------------*/}
									<div className='space-y-2 '>
										{/*--------------name-------------*/}
										<h2 className='text-xl text-font1 font-bold tracking-wider capitalize'>
											{instructor?.user?.name}
										</h2>
										<p className='text-base text-font1  tracking-wider font-medium'>
											{instructor?.user?.email}
										</p>
										{/*--------------rating-------------*/}
										<div className='flex items-center space-x-4'>
											<Rate
												style={{
													fontSize: '28px',
												}}
												value={instructor?.rating}
												disabled
											/>
											<div className='bg-primary text-white px-2 rounded m-0'>
												{instructor?.rating}
											</div>
										</div>

										{/* social medial link
								<div className='flex text-3xl text-primary space-x-2'>
									<FaFacebookSquare />
									<FaLinkedin />
									<FaTwitterSquare />
								</div> */}
									</div>
								</div>
								<hr />
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
											<div
												key={id}
												className='flex flex-col justify-center items-center space-y-2'
											>
												<div className=' flex items-center justify-center'>
													{icon}
												</div>

												<h4 className='text-font1 text-2xl font-medium p-0'>
													{noOfCourse ||
														noOfReviews ||
														noOfStudents}
												</h4>
												<p className='text-font2 text-xl capitalize'>
													{title}
												</p>
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
												<section className='p-4 space-y-4'>
													{/* education */}
													<div className='bg-light rounded-lg p-4 space-y-2'>
														<h2 className='text-font1 text-xl font-semibold'>
															Education
														</h2>
														<hr />
														{/* degree */}
														<div className='flex items-start space-x-2'>
															<div className='p-0.5 border border-primary rounded-lg'>
																<HiOutlineCheck
																	className='text-primary'
																	size={18}
																/>
															</div>
															<span>
																Currently
																studying in
															</span>
															<span >
																{instructor &&
																	instructor.degreeTitle}
															</span>
														</div>
														{/* institution */}
														<div className='flex items-start space-x-2'>
															<div className='p-0.5 border border-primary rounded-lg'>
																<HiOutlineCheck
																	className='text-primary'
																	size={18}
																/>
															</div>
															<span>At </span>
															<span >
																{instructor &&
																	instructor.institutionName}
															</span>
														</div>
														{/* Approx Passing Year */}
														<div className='flex items-start space-x-2'>
															<div className='p-0.5 border border-primary rounded-lg'>
																<HiOutlineCheck
																	className='text-primary'
																	size={18}
																/>
															</div>
															<span>
																Graduation in
															</span>
															<span>
																{instructor &&
																	instructor.approxPassingYear}
															</span>
														</div>
													</div>
													{/* about */}
													<div className='bg-light rounded-lg p-4 space-y-2'>
														<h2 className='text-font1 text-xl font-semibold'>
															About
														</h2>
														<hr />
														<p className=''>
															{instructor &&
																instructor.aboutYou}
														</p>
													</div>
													{/* skillset */}
													<div className='bg-light rounded-lg p-4 space-y-2'>
														<h2 className='text-font1 text-xl font-semibold'>
															Skill Sets
														</h2>
														<hr />
														<div className='flex space-x-3 '>
															{instructor &&
																instructor?.skillSets?.map(
																	(
																		skill,
																		index
																	) => (
																		<p
																			key={
																				index
																			}
																			className='capitalize bg-gray-200 rounded px-4 py-2'
																		>
																			{
																				skill
																			}
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
													{instructor?.courses
														?.length > 0 ? (
														instructor?.courses?.map(
															(course) => (
																<CourseCard
																	key={
																		course._id
																	}
																	course={
																		course
																	}
																/>
															)
														)
													) : (
														<div>No Courses.</div>
													)}
												</div>
											),
										},
									]}
									onChange={onChange}
								/>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='bg-background2 bg-center bg-cover'>
				<FooterComponent />
			</div>
		</section>
	);
};

export default ContentWriterProfile;
