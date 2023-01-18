import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { MdDeleteOutline } from 'react-icons/md';
import { message, Popconfirm } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/layout/Loading/Loading';

const MyCourses = () => {
	const [myCourseList, setMyCourseList] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isEnrolling, setIsEnrolling] = useState(false);

	useEffect(() => {
		setIsFetching(true);
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
			.patch('/courses/users', { courseId, isAdd: true })
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
				<div className='bg-light h-[25vh]'></div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 p-4 h-full drop-shadow'>
						{/* ---------- My Courses Nav ---------- */}
						<div className='col-span-4 rounded-lg p-4 bg-light space-y-4'>
							<div className='px-4 py-2 rounded-lg border bg-white'>
								My Courses
							</div>
							<div className='p-4 bg-white rounded-lg'>
								{/* <img
									className='w-full h-[250px] object-fit'
									src={courseImage}
									alt='course-imgs'
								/> */}
								<lottie-player
									autoplay
									loop
									background='white'
									src='https://assets5.lottiefiles.com/packages/lf20_tb15abek.json'
									style={{ width: '100%', height: '350px' }}
								/>
							</div>
						</div>
						{/* ---------- My Courses List ---------- */}
						<div className='col-span-8 p-4 space-y-4'>
							<h4 className='text-xl font-medium'>My Courses</h4>
							<hr />
							<div className='grid grid-cols-3 gap-4 justify-between'>
								{!myCourseList.length ? (
									<div className='col-span-3 flex justify-center items-center'>
										<Loading />
									</div>
								) : (
									myCourseList.map((course) => {
										return (
											<>
												{/* course */}
												<article className='relative p-4 border rounded-lg flex flex-col justify-between space-y-2'>
													<img
														className='w-full h-[250px] rounded-lg border object-fit'
														src={course.courseThumb}
														alt='course-load'
													/>
													{/* course - body */}
													<div>
														<h5 className='text-lg'>
															{course.courseTitle}
														</h5>
													</div>
													{/* button */}
													<Link
														to={`/course-content/${course._id}`}
													>
														<button className='inline-block w-full py-2 border border-primary rounded-lg text-primary drop-shadow hover:bg-primary hover:text-white'>
															Go To Content Page
														</button>
													</Link>
													<Popconfirm
														onConfirm={() =>
															handleUnenrollCourse(
																course._id
															)
														}
														title='Are you sure？'
														okText='Yes'
														cancelText='No'
													>
														<button className='absolute top-1 right-1 p-0.5 text-error rounded-lg border border-error'>
															<MdDeleteOutline
																size={17}
															/>
														</button>
													</Popconfirm>
												</article>
											</>
										);
									})
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
			<div style={{ background: '#040453' }}>
				<FooterComponent />
			</div>
		</>
	);
};

export default MyCourses;
