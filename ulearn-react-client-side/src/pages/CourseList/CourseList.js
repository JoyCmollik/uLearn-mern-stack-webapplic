import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Rate, Result, Select, Tag } from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import bannerTemp from '../../images/cool-background.png';
import axios from 'axios';
import Loading from '../../components/layout/Loading/Loading';
import { Link } from 'react-router-dom';
import { BsFillPlayCircleFill, BsSearch } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { RiClosedCaptioningFill } from 'react-icons/ri';
import { TbExternalLink } from 'react-icons/tb';
import moment from 'moment';

const CourseList = () => {
	const [courseList, setCourseList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isFetching, setIsFetching] = useState(true);

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

	const onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	};

	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='h-[25vh] flex flex-col justify-start items-center bg-background bg-cover bg-center bg-no-repeat pt-[2vh] relative'>
					<h3 className='text-white text-2xl text-center'>
						Courses
					</h3>
					<BreadcrumbComponents />
				</div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 gap-8 p-4 h-full'>
						{/* ---------- More Options ---------- */}
						<div className='col-span-12 p-6 border rounded-lg flex bg-white justify-between items-center'>
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
								// onChange={handleChange}
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
						{/* ---------- Courses List ---------- */}
						<div className='col-span-8 rounded-lg space-y-4'>
							{isFetching ? (
								<div className='flex justify-center items-center w-full min-h-[40vh]'>
									<Loading />
								</div>
							) : (
								<>
									{!courseList.length ? (
										<Result
											status='500'
											title='500'
											subTitle='Sorry, something went wrong.'
											extra={
												<Link to={'/'}>
													<button className='bg-primary px-4 py-2 text-white rounded-lg'>
														Back home
													</button>
												</Link>
											}
										/>
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
														averageRating,
														category,
														language,
														createdAt,
														_id,
													} = course;
													return (
														<article
															key={_id}
															className='flex justify-between border rounded-lg overflow-hidden'
														>
															{/* course image */}
															<img
																src={
																	courseThumb
																}
																alt='course-thumb'
																className='w-[300px] h-[250px] object-cover'
															/>
															{/* course info */}
															<div className='flex-grow p-4 flex flex-col justify-between space-y-2'>
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
																			{
																				averageRating
																			}
																			.00
																		</div>
																	</div>
																	{/* stats */}
																	<div className='flex items-center space-x-2'>
																		<div className='flex items-center'>
																			<BsFillPlayCircleFill className='inline-block text-base mr-2 text-font2' />
																			<span className='text-base'>
																				{
																					sections.length
																				}{' '}
																				Section
																			</span>
																		</div>
																		<span className='w-[0.25px] h-[16px] bg-font2' />
																		<div className='flex items-center'>
																			<BiTimeFive className='inline-block text-base mr-2 text-font2' />
																			<span className='text-base'>
																				{moment(
																					createdAt
																				).format(
																					'D-M-Y'
																				)}
																			</span>
																		</div>
																	</div>
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
						{/* ---------- All Courses Filters, Queries ---------- */}
						<div className='col-span-4 p-4 space-y-4 border rounded-lg h-fit'>
							{/* filter - title */}
							<div className='space-y-2'>
								<h4 className='text-lg font-medium m-0 p-0'>
									Categories
								</h4>
								<div className='w-[45px] h-[4px] bg-primary' />
							</div>
							{/* filter - options */}
							<Checkbox.Group
								className='w-full space-y-2'
								onChange={onChange}
							>
								{categories.length > 0 &&
									categories.map((categoryItem) => (
										<div
											key={categoryItem._id}
											className='flex justify-between items-center'
										>
											<p className='flex-grow m-0 capitalize p-0 text-font1'>
												{categoryItem.category}
											</p>
											<Checkbox
												value={categoryItem._id}
											/>
										</div>
									))}
							</Checkbox.Group>
							<button className='p-2 border border-primary rounded-lg text-primary w-full'>
								Filter Courses
							</button>
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
