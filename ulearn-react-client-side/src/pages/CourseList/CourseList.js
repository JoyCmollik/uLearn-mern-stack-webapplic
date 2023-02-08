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
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Lottie from '../../components/layout/Lottie/Lottie';
import moment from 'moment';
import { HiAcademicCap, HiDocumentPlus, HiOutlineClock } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import useFramerMotion from '../../hooks/useFramerMotion';
import CourseSearchItem from './CourseSearchItem';

const CourseList = () => {
	const [courseList, setCourseList] = useState([]);
	const [searchCourseList, setSearchCourseList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const [searchDropOpen, setSearchDropOpen] = useState(false);
	const [filters, setFilters] = useState({ sort: '-_id' });
	const [query, setQuery] = useState('');
	const [currentPage, setCurrentPage] = useState({ page: 1, limit: 4 });
	const searchRef = useRef('');

	// hook constants
	const { list, item } = useFramerMotion();

	// initial fetches
	useEffect(() => {
		setIsFetching(true);
		if (!categories.length) {
			axios
				.get('/categories?fields=category,-user')
				.then((response) => {
					console.log(response.data.categories);
					setCategories(response.data.categories);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (!courseList.length) {
			axios
				.get(`/courses?page=1&limit=${currentPage?.limit}&sort=-_id`)
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
		}
	}, []);

	const handleFetchFilterCourses = (
		newPage = false,
		newQuery = false,
		sort = false
	) => {
		const page = newPage || currentPage.page;
		const limit = currentPage?.limit;
		const currQuery = newQuery || query;
		const sortBy = sort || filters.sort;
		const fetchURL = `/courses?page=${page}&limit=${limit}&sort=${sortBy}${currQuery}`;

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

	const handleSearchCourseList = () => {
		if (searchRef.current.value) {
			setIsSearching(true);
			setSearchDropOpen(true);
			console.log(searchRef.current);
			const fetchURL = `/courses?search=${searchRef.current.value}`;
			axios
				.get(fetchURL)
				.then((response) => {
					//console.log(response.data.courses);
					setSearchCourseList(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsSearching(false);
				});
		} else {
			message.warning('Your search query is empty!');
		}
	};

	const handlePageChange = (newPage) => {
		setCurrentPage((prevPage) => {
			return { ...prevPage, page: newPage };
		});
		handleFetchFilterCourses(newPage);
	};

	// category and level handler
	const handleFilters = (field, value) => {
		setFilters((prevFilters) => {
			let newFilter = {};
			if (field === 'sort') {
				newFilter = { ...prevFilters, sort: value };
				handleFetchFilterCourses(1, query, value);
				return newFilter;
			} else if (value.length) {
				newFilter = { ...prevFilters, [field]: value.join(',') };
			} else {
				delete prevFilters[field];
				newFilter = { ...prevFilters };
			}
			handleQueryBuilder(newFilter);
			return newFilter;
		});
	};

	const handleQueryBuilder = (newFilter) => {
		// resetting pagination
		setCurrentPage({ page: 1, limit: 4 });
		// adding category
		let newQuery = newFilter?.category
			? `&category=${newFilter.category}`
			: '';

		// level parameters
		newQuery += newFilter?.level ? `&level=${newFilter.level}` : '';

		setQuery((prevQuery) => {
			return newQuery;
		});
	};
	// handle change for dropdown
	const handleSearchDropDown = (flag) => {
		setSearchDropOpen(flag);
	};

	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='h-[34vh] bg-light relative'>
					<div className='w-full h-full bg-background bg-cover bg-center bg-no-repeat pt-[8vh] flex justify-center items-start'>
						<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
							<h3 className='text-2xl text-center text-white'>
								Courses
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
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 gap-8 p-4 h-full'>
						{/* ---------- More Options ---------- */}
						<div className='col-span-12 p-4 border rounded-lg flex bg-white justify-between items-center'>
							{/* filter options - newest oldest */}
							<Select
								className='items-end place-self-end'
								defaultValue='-_id'
								style={{
									width: 240,
									borderRadius: '8px',
								}}
								size='large'
								onChange={(value) =>
									handleFilters('sort', value)
								}
								options={[
									{
										value: '-_id',
										label: 'Newest',
									},
									{
										value: '_id',
										label: 'Oldest',
									},
								]}
							/>
							{/* ---------- Search Options ---------- */}
							<Dropdown
								overlay={
									<div className='bg-white rounded-lg p-4 w-[440px] h-fit border overflow-y-auto'>
										{isSearching ? (
											<div className='w-full h-full flex justify-center items-center'>
												<Loading />
											</div>
										) : (
											<div className='grid grid-cols-12 gap-2 overflow-hidden'>
												{!searchCourseList.length ? (
													<div className='col-span-12 flex justify-center items-center'>
														<Lottie
															src='https://assets10.lottiefiles.com/packages/lf20_suc7tciv.json'
															size={{
																width: 120,
																height: 120,
															}}
														/>
													</div>
												) : (
													<>
														<h4 className='col-span-12 text-xs m-0'>
															Search results:
														</h4>
														<hr className='col-span-12' />
														{searchCourseList.map(
															(course) => (
																<CourseSearchItem
																	key={
																		course._id
																	}
																	course={
																		course
																	}
																	setSearchDropOpen={
																		setSearchDropOpen
																	}
																/>
															)
														)}
													</>
												)}
											</div>
										)}
									</div>
								}
								open={searchDropOpen}
								onOpenChange={handleSearchDropDown}
								placement='bottomRight'
							>
								{/* ---------- Search Query ---------- */}
								<div className='flex items-center border border-primary rounded-lg overflow-hidden w-[350px]'>
									<BsSearch
										style={{
											fontSize: '20px',
											margin: '0 10px',
										}}
									/>
									<input
										className='outline-none p-2 w-full'
										ref={searchRef}
										type='text'
										// onChange={handleSearchValue}
										placeholder='Search by keywords'
									/>
									<button
										onClick={(e) => {
											e.preventDefault();
											handleSearchCourseList();
										}}
										className='block bg-primary text-white px-4 py-2'
									>
										Search
									</button>
								</div>
							</Dropdown>
						</div>
						{/* ---------- All Courses Filters, Queries ---------- */}
						<div className='col-span-4 p-4 space-y-4 border rounded-lg h-fit'>
							{/* filter - Categories */}
							<div className='space-y-4'>
								<div className='space-y-2'>
									<h4 className='text-lg font-medium m-0 p-0'>
										Categories
									</h4>
									<div className='w-[45px] h-[4px] bg-primary' />
								</div>
								{/* filter - options */}
								<Checkbox.Group
									name='category'
									className='w-full space-y-2'
									onChange={(value) =>
										handleFilters('category', value)
									}
								>
									<motion.div
										className='space-y-2'
										initial='hidden'
										animate='visible'
										variants={list}
									>
										{categories.length > 0 &&
											categories.map((categoryItem) => (
												<motion.div
													key={categoryItem._id}
													className='flex justify-between items-center'
													variants={item}
												>
													<p className='flex-grow m-0 capitalize p-0 text-font1 text-base'>
														{categoryItem.category}
													</p>
													<Checkbox
														value={categoryItem._id}
													/>
												</motion.div>
											))}
									</motion.div>
								</Checkbox.Group>
							</div>
							<hr />
							{/* filter - levels */}
							<div className='space-y-4'>
								<div className='space-y-2 '>
									<h4 className='text-lg font-medium m-0 p-0'>
										Levels
									</h4>
									<div className='w-[45px] h-[4px] bg-primary' />
								</div>
								{/* filter - options */}
								<Checkbox.Group
									name='level'
									className='w-full space-y-2'
									onChange={(value) =>
										handleFilters('level', value)
									}
								>
									{[
										'Beginner',
										'Intermediate',
										'Advanced',
									].map((levelItem) => (
										<div
											key={levelItem}
											className='flex justify-between items-center'
										>
											<p className='flex-grow m-0 capitalize p-0 text-font1 text-base'>
												{levelItem}
											</p>
											<Checkbox value={levelItem} />
										</div>
									))}
								</Checkbox.Group>
							</div>
							<button
								onClick={() =>
									handleFetchFilterCourses(1, query)
								}
								className='p-2 border border-primary rounded-lg text-primary w-full'
							>
								Filter Courses
							</button>
						</div>
						{/* ---------- Courses List ---------- */}
						<div className='col-span-8 rounded-lg space-y-4'>
							{isFetching ? (
								<div className='flex justify-center items-center w-full min-h-[40vh]'>
									<Loading />
								</div>
							) : (
								<>
									{!courseList?.courses?.length ? (
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

export default CourseList;
