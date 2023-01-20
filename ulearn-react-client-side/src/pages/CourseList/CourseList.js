import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Rate, Result, Select, Tag } from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import axios from 'axios';
import Loading from '../../components/layout/Loading/Loading';
import { Link } from 'react-router-dom';
import { BsFillPlayCircleFill, BsSearch } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import Lottie from '../../components/layout/Lottie/Lottie';
import moment from 'moment';
import { HiAcademicCap, HiDocumentPlus, HiOutlineClock } from 'react-icons/hi2';

const CourseList = () => {
	const [courseList, setCourseList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [filters, setFilters] = useState({});

	useEffect(() => {
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
				.get('/courses')
				.then((response) => {
					//console.log(response.data.courses);
					setCourseList(response.data.courses);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
	}, []);

	const handleFilters = (field, value) => {
		setFilters((prevFilters) => {
			let newFilter = {};
			newFilter = { ...prevFilters, [field]: value.join(',') };
			console.log(newFilter);
			return newFilter;
		});
	};

	const handleFilterCourseFetch = () => {
		// adding category
		let query = filters?.category?.length
			? `category=${filters.category}`
			: '';
		// if category is added, separator is added
		if (query.length) query += '&';
		// level parameters
		query += filters?.level?.length ? `level=${filters.level}` : '';
		setIsFetching(true);
		axios
			.get(`/courses?${query}`)
			.then((response) => {
				//console.log(response.data.courses);
				setCourseList(response.data.courses);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsFetching(false);
			});
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
							{/* search */}
							<div className='flex items-center border border-primary rounded-lg overflow-hidden w-[350px]'>
								<BsSearch
									style={{
										fontSize: '20px',
										margin: '0 10px',
									}}
								/>
								<input
									className='outline-none p-2 w-full'
									type='text'
									// onChange={handleSearchValue}
									placeholder='Search by keywords'
								/>
								<button className='block bg-primary text-white px-4 py-2'>
									Search
								</button>
							</div>
							{/* filter options - newest oldest */}
							<Select
								className='items-end place-self-end'
								defaultValue='-_id'
								style={{
									width: 240,
									borderRadius: '8px',
								}}
								size='large'
								onChange={handleFilters}
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
									{categories.length > 0 &&
										categories.map((categoryItem) => (
											<div
												key={categoryItem._id}
												className='flex justify-between items-center'
											>
												<p className='flex-grow m-0 capitalize p-0 text-font1 text-base'>
													{categoryItem.category}
												</p>
												<Checkbox
													value={categoryItem._id}
												/>
											</div>
										))}
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
								onClick={handleFilterCourseFetch}
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
									{!courseList.length ? (
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
											<div className='container-wrapper space-y-4'>
												{courseList.map((course) => {
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
														<article
															key={_id}
															className='flex justify-between bg-white drop-shadow rounded-lg overflow-hidden'
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
																				instructor.avatarURL
																			}
																			alt='avatar'
																		/>
																		<h5 className='text-base m-0 text-font2 capitalize'>
																			{
																				instructor.name
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
																	Prepared in{' '}
																	<span className='font-medium'>
																		{
																			language
																		}
																	</span>
																</div>
															</div>
														</article>
													);
												})}
											</div>
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
			<div style={{ background: '#040453' }}>
				<FooterComponent />
			</div>
		</>
	);
};

export default CourseList;
