import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { MdDeleteOutline } from 'react-icons/md';
import { message, Popconfirm, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/layout/Loading/Loading';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import Lottie from '../../components/layout/Lottie/Lottie';
import { motion } from 'framer-motion';
import useFramerMotion from '../../hooks/useFramerMotion';

const MyCourses = () => {
	const [myCourseList, setMyCourseList] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isEnrolling, setIsEnrolling] = useState(false);
	const { list, item } = useFramerMotion();

	useEffect(() => {
		axios
			.get('/courses/users')
			.then((response) => {
				console.log(response.data.courses);
				setMyCourseList(response.data.courses);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

	// function - to enrol user to the current course
	const handleUnenrollCourse = (courseId) => {
		setIsEnrolling(true);
		axios
			.patch('/courses/users', { courseId, isAdd: false })
			.then((response) => {
				console.log(response.data.currLearner);
				message.success('Course is unenrolled successfully');
				setMyCourseList((prevList) =>
					prevList.filter(
						(course) => course._id.toString() !== courseId
					)
				);
			})
			.catch((error) => {
				console.log(error);
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsEnrolling(false);
			});
	};
	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='h-[34vh] bg-light relative'>
					<div className='w-full h-full bg-background1 bg-cover bg-center bg-no-repeat pt-[8vh] flex justify-center items-start'>
						<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
							<h3 className='text-2xl text-center text-white'>
								My Courses
							</h3>
							<BreadcrumbComponents />
						</div>
					</div>
				</div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 p-4 gap-4 drop-shadow h-full'>
						{/* ---------- My Courses Nav ---------- */}
						<div className='col-span-4 rounded-lg space-y-4 bg-[#2169AA] drop-shadow overflow-hidden'>
							<div className='w-full h-full bg-myCourseBackImag bg-cover bg-right bg-no-repeat' />
						</div>
						{/* ---------- My Courses List ---------- */}
						<div className='col-span-8 p-4 space-y-4'>
							<h4 className='text-xl font-medium'>My Courses</h4>
							<hr />
							<motion.div
								initial='hidden'
								animate='visible'
								variants={list}
								className='grid grid-cols-1 gap-4 justify-between'
							>
								{isFetching ? (
									<div className='col-span-1 flex justify-center items-center'>
										<Loading />
									</div>
								) : (
									<>
										{Boolean(!myCourseList.length) ? (
											<div className='col-span-1 p-4 flex justify-center items-center'>
												<Lottie
													src='https://assets10.lottiefiles.com/private_files/lf30_e3pteeho.json'
													size={{
														width: 400,
														height: 400,
													}}
												/>
											</div>
										) : null}
										{Boolean(myCourseList.length)
											? myCourseList.map((course) => {
													return (
														<>
															{/* course */}
															<motion.article
																key={
																	course?._id
																}
																variants={item}
																className='relative border rounded-lg grid grid-cols-12 space-x-4 h-[250px]'
															>
																{/* left */}
																<div className='col-span-4 text-center h-[250px] bg-light overflow-hidden'>
																	<img
																		className='w-full h-full object-cover'
																		src={
																			course?.courseThumb
																		}
																		alt='course-load'
																	/>
																</div>
																{/* right */}
																<div className='col-span-8 p-4 flex flex-col justify-between'>
																	{/* course - body */}
																	<div>
																		<h5 className='text-lg'>
																			{
																				course?.courseTitle
																			}
																		</h5>
																		<p className='text-font2'>
																			{
																				course?.courseShortDesc
																			}
																		</p>
																		<div className='flex items-center space-x-1'>
																			<Tag
																				style={{
																					borderRadius:
																						'8px',
																				}}
																				color='green'
																			>
																				{
																					course?.language
																				}
																			</Tag>
																			<Tag
																				style={{
																					borderRadius:
																						'8px',
																				}}
																				color='blue'
																			>
																				{
																					course?.level
																				}
																			</Tag>
																		</div>
																	</div>
																	{/* button */}
																	<Link
																		to={`/course-content/${course?._id}`}
																	>
																		<button className='inline-block w-full py-2 border border-primary rounded-lg text-primary drop-shadow hover:bg-primary hover:text-white'>
																			Go
																			To
																			Content
																			Page
																		</button>
																	</Link>
																</div>
																<Popconfirm
																	onConfirm={() =>
																		handleUnenrollCourse(
																			course?._id
																		)
																	}
																	title='Are you sure？'
																	okText='Yes'
																	cancelText='No'
																>
																	<button className='absolute top-1 right-1 p-0.5 text-error rounded-lg border border-error'>
																		<MdDeleteOutline
																			size={
																				17
																			}
																		/>
																	</button>
																</Popconfirm>
															</motion.article>
														</>
													);
											  })
											: null}
									</>
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</section>
			<div className='bg-background2 bg-center bg-cover'>
				<FooterComponent />
			</div>
		</>
	);
};

export default MyCourses;
