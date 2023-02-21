import React, { useEffect, useRef, useState } from 'react';
import {
	Avatar,
	Checkbox,
	Dropdown,
	message,
	Pagination,
	Rate,
	Select,
} from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import axios from 'axios';
import Loading from '../../components/layout/Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Lottie from '../../components/layout/Lottie/Lottie';
import moment from 'moment';
import { HiAcademicCap, HiDocumentPlus, HiOutlineClock } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import useFramerMotion from '../../hooks/useFramerMotion';

const CourseListByCategory = () => {
	const [courseList, setCourseList] = useState([]);
	const [isFetching, setIsFetching] = useState(true)
	const [currentPage, setCurrentPage] = useState({ page: 1, limit: 4 });
    const [categoryName, setCategoryName] = useState('Category');

	// hook constants
	const { list, item } = useFramerMotion();
    const { categoryId } = useParams();

	// initial fetches
	useEffect(() => {
		const source = axios.CancelToken.source();
		// setIsFetching(true);
		if (!courseList.length) {
			axios
				.get(
					`/courses?page=1&limit=${currentPage?.limit}&sort=-_id&category=${categoryId}`,
					{
						cancelToken: source.token,
					}
				)
				.then((response) => {
					//console.log(response.data.courses);
					setCourseList(response.data);
                    setCategoryName(response.data?.courses[0]?.category?.name)
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
		return () => {
			source?.cancel('Cancelling fetch request on unmount.');
		};
	}, [categoryId]);

	const handleFetchFilterCourses = (
		newPage = false,
		newQuery = false,
		sort = false
	) => {
		const page = newPage || currentPage.page;
		const limit = currentPage?.limit;
		const fetchURL = `/courses?page=${page}&limit=${limit}&category=${categoryId}`;

		console.log(fetchURL);

		setIsFetching(true);
		axios
			.get(fetchURL)
			.then((response) => {
				//console.log(response.data.courses);
				setCourseList(response.data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsFetching(false);
			});
	};

	const handlePageChange = (newPage) => {
		setCurrentPage((prevPage) => {
			return { ...prevPage, page: newPage };
		});
		handleFetchFilterCourses(newPage);
	};

	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='h-[34vh] bg-light relative'>
					<div className='w-full h-full bg-gradient bg-cover bg-top bg-no-repeat pt-[8vh] flex justify-center items-start'>
						<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
							<h3 className='capitalize text-2xl text-center text-white'>
								{categoryName}{' '}
								Courses
							</h3>
							<BreadcrumbComponents
								currLinkTitle={
									courseList?.length
										? courseList[0]?.category?.name
										: 'Category'
								}
							/>
						</div>
					</div>
				</div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 gap-8 p-4 h-full'>
						{/* ---------- Courses List ---------- */}
						<div className='col-span-12 rounded-lg space-y-4'>
							{isFetching ? (
								<div className='flex justify-center items-center w-full min-h-[40vh]'>
									<Loading />
								</div>
							) : (
								<>
									{courseList?.length === 0 ? (
										<div className='flex justify-center items-center'>
											<Lottie
												src='https://assets3.lottiefiles.com/packages/lf20_rdjfuniz.json'
												size={{
													width: '450',
													height: '450',
												}}
											/>
										</div>
									) : (
										<>
											<motion.div
												className='container-wrapper space-y-4'
												initial='hidden'
												animate='visible'
												variants={list}
											>
												{courseList?.courses?.map(
													(course) => {
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
															<motion.article
																key={_id}
																className='flex justify-between bg-white drop-shadow rounded-lg overflow-hidden'
																variants={item}
															>
																{/* course image */}
																<Link
																	to={`/course-list/${_id}`}
																>
																	<img
																		src={
																			courseThumb
																		}
																		alt='course-thumb'
																		className='w-[300px] h-[250px] object-cover'
																	/>
																</Link>
																{/* course info */}
																<div className='flex-grow p-4 flex flex-col justify-between space-y-2 relative'>
																	<h4 className='text-lg font-medium'>
																		{
																			courseTitle
																		}
																	</h4>
																	<div className='space-y-2'>
																		<p className='m-0 p-0'>
																			in{' '}
																			<span className='capitalize underline'>
																				{' '}
																				{
																					category?.name
																				}
																			</span>
																		</p>
																		{/* creator */}
																		<div className='flex items-center space-x-1'>
																			<Avatar
																				size={
																					45
																				}
																				src={
																					instructor?.avatarURL
																				}
																				alt='avatar'
																			/>
																			<h5 className='text-base m-0 text-font2 capitalize'>
																				{
																					instructor?.name
																				}
																			</h5>
																		</div>
																		{/* rating */}
																		<div className='flex items-center space-x-2'>
																			<Rate
																				disabled
																				defaultValue={
																					averageRating
																				}
																			/>
																			<div className='px-4 rounded-lg bg-light text-primary'>
																				{averageRating ==
																				'0'
																					? 'Not reviewed yet'
																					: `${averageRating}.00`}
																			</div>
																		</div>
																		{/* stats */}
																		<div className='flex items-center space-x-2'>
																			<div className='flex items-center'>
																				<HiDocumentPlus className='inline-block text-base mr-2 text-font2' />
																				<span className='text-base'>
																					{
																						sections.length
																					}{' '}
																					Section
																				</span>
																			</div>
																			<span className='w-[0.25px] h-[16px] bg-font2' />
																			<div className='flex items-center'>
																				<HiOutlineClock className='inline-block text-base mr-2 text-font2' />
																				<span className='text-base'>
																					{moment(
																						createdAt
																					).format(
																						'LL'
																					)}
																				</span>
																			</div>
																			<span className='w-[0.25px] h-[16px] bg-font2' />
																			<div className='flex items-center'>
																				<HiAcademicCap className='inline-block text-base mr-2 text-font2' />
																				<span className='text-base'>
																					{
																						currLearners.length
																					}{' '}
																					Learners
																				</span>
																			</div>
																		</div>
																	</div>
																	{/* level */}
																	<div className='absolute top-0 right-2 bg-blue-400 text-white px-4 py-1 rounded-lg'>
																		{level}
																	</div>
																	{/* language */}
																	<div className='absolute bottom-2 right-2 bg-light px-4 py-2 rounded-lg'>
																		Prepared
																		in{' '}
																		<span className='font-medium'>
																			{
																				language
																			}
																		</span>
																	</div>
																</div>
															</motion.article>
														);
													}
												)}
												<div className='flex justify-center items-center p-4'>
													<Pagination
														current={
															currentPage?.page
														}
														onChange={
															handlePageChange
														}
														pageSize={
															currentPage?.limit
														}
														total={
															courseList?.total
														}
													/>
												</div>
											</motion.div>
											{/*-------------------------pagination-------------------------*/}
											<div className='mt-16'></div>
										</>
									)}
								</>
							)}
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

export default CourseListByCategory;
