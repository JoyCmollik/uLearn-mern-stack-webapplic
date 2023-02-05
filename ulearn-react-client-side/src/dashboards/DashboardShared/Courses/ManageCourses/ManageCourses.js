import React, { useEffect, useState } from 'react';

// components import
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
// icon imports
import { HiPlus } from 'react-icons/hi2';
import { message, notification } from 'antd';
import ManageCoursesTable from '../MangeCoursesTable/ManageCoursesTable';
import axios from 'axios';
import Loading from '../../../../components/layout/Loading/Loading';
import { Link } from 'react-router-dom';

const courseStatList = [
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/gqdnbnwt.json' size={40} />
		),
		value: 14,
		title: 'Total Courses',
		dataIndex: 'totalCourses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/jqeuwnmb.json' size={40} />
		),
		value: 14,
		title: 'Active Courses',
		dataIndex: 'activeCourses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/kvsszuvz.json' size={40} />
		),
		value: 14,
		title: 'Pending Courses',
		dataIndex: 'pendingCourses',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/mdgrhyca.json' size={40} />
		),
		value: 14,
		title: '5 Rated Courses',
		dataIndex: 'ratedCourses',
	},
];

const initialStat = {
	totalCourses: 0,
	activeCourses: 0,
	pendingCourses: 0,
	ratedCourses: 0,
};

const ManageCourses = () => {
	const [courses, setCourses] = useState(null);
	const [displayCourses, setDisplayCourses] = useState(null);
	const [courseStat, setCourseStat] = useState({ ...initialStat });
	const [categories, setCategories] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [loadingStatus, setLoadingStatus] = useState({
		isApproving: false,
		isDeleting: false,
	});
	const [filters, setFilters] = useState({ sort: '-_id' });
	const [query, setQuery] = useState('');

	// library constants

	// functions - on component mount
	useEffect(() => {
		if (!courses) {
			setIsFetching(true);
			axios
				.get('/courses?status=all')
				.then((response) => {
					setCourses(response.data.courses);
					setDisplayCourses(response.data.courses);
					handleCourseStats(response.data.courses);
				})
				.catch((error) => {
					message.error(error.message);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
		if (!categories.length) {
			axios
				.get('/categories')
				.then((response) => {
					setCategories(() => {
						const newCategories = response.data.categories.map(
							(categoryItem) => {
								return {
									label: categoryItem.category,
									value: categoryItem._id,
								};
							}
						);
						return [
							{
								label: 'All',
								value: '',
							},
							...newCategories,
						];
					});
				})
				.catch((error) => {
					message.error(error.message);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
	}, []);

	// function - fetch course on filters
	const handleFetchFilterCourses = (newQuery) => {
		const sortBy = filters.sort;
		const currQuery = newQuery || query;
		const fetchURL = `/courses?sort=${sortBy}${currQuery}`;

		console.log(fetchURL);

		setIsFetching(true);
		axios
			.get(fetchURL)
			.then((response) => {
				setDisplayCourses(response.data.courses);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsFetching(false);
			});
	};

	// functions - to filter courses
	const handleFilters = (field, value) => {
		setFilters((prevFilters) => {
			let newFilter = {};
			if (value.length) {
				newFilter = { ...prevFilters, [field]: value };
			} else {
				delete prevFilters[field];
				newFilter = { ...prevFilters };
			}
			handleQueryBuilder(newFilter);
			return newFilter;
		});
	};

	// function - to build query
	const handleQueryBuilder = (newFilter) => {
		// adding category
		let newQuery = newFilter?.category
			? `&category=${newFilter.category}`
			: '';

		// level parameters
		newQuery += newFilter?.level ? `&level=${newFilter.level}` : '';
		newQuery += newFilter?.status ? `&status=${newFilter.status}` : '';
		newQuery += newFilter?.language
			? `&language=${newFilter.language}`
			: '';

		setQuery((prevQuery) => {
			return newQuery;
		});
	};

	// functions - update course stats
	const handleCourseStats = (courses) => {
		// calculating course stats to show
		setCourseStat((prevStat) => {
			const newStat = { ...initialStat };
			newStat.totalCourses = courses.length;
			courses.forEach((course) => {
				if (course.status === 'active') newStat.activeCourses += 1;
				else if (course.status === 'pending')
					newStat.pendingCourses += 1;
				if (course.averageRating === '5') newStat.ratedCourses += 1;
			});
			return newStat;
		});
	};

	// functions - to approve course
	const handleApproveCourse = (course) => {
		const updatedCourse = { ...course, status: 'active' };
		setLoadingStatus((prevStatus) => {
			return { ...prevStatus, isApproving: true, currCourse: course._id };
		});

		axios
			.patch(`/courses/${updatedCourse._id}`, updatedCourse)
			.then((response) => {
				const updatedCourse = response.data.course;
				setCourses((prevCourses) => {
					const newCourses = prevCourses.map((course) => {
						if (course._id === updatedCourse._id)
							return updatedCourse;
						else return course;
					});
					handleCourseStats(newCourses);
					setDisplayCourses(newCourses);
					return newCourses;
				});
			})
			.catch((error) => {
				message.error(error.message);
			})
			.finally(() => {
				setLoadingStatus((prevStatus) => {
					return {
						...prevStatus,
						isApproving: false,
						currCourse: null,
					};
				});
			});
	};

	// functions - to delete a course
	const handleDeleteCourse = (courseId) => {
		setLoadingStatus((prevStatus) => {
			return { ...prevStatus, isDeleting: true, currCourse: courseId };
		});
		const key = 'deleting';
		notification.info({
			key,
			message: 'Deleting course is ongoing!',
		});

		axios
			.delete(`/courses/${courseId}`)
			.then((response) => {
				setCourses((prevCourses) => {
					const newCourses = prevCourses.filter(
						(course) => String(course._id) !== courseId
					);
					handleCourseStats(newCourses);
					setDisplayCourses(newCourses);
					return newCourses;
				});
				notification.success({
					key,
					message: 'Success! Course has been deleted.',
				});
			})
			.catch((error) => {
				message.error(error.message);
			})
			.finally(() => {
				setLoadingStatus((prevStatus) => {
					return {
						...prevStatus,
						isDeleting: false,
						currCourse: null,
					};
				});
			});
	};

	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Courses</h4>
				{/* add new course */}
				<Link to='add'>
					<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
						<HiPlus size={20} /> <span>Add New Course</span>
					</button>
				</Link>
			</div>
			{/*****--------------Course Stats---------------*****/}
			<div className='grid grid-cols-4 gap-4'>
				{courseStatList.map(({ icon, title, dataIndex }, statIdx) => (
					<>
						<div
							key={statIdx}
							className='flex flex-col justify-between items-center space-y-2 border-[0.5px] rounded-lg p-4 drop-shadow-lg'
						>
							{icon}
							<h4 className='text-2xl font-medium '>
								{courseStat[dataIndex]}
							</h4>
							<p className='text-font2'>{title}</p>
						</div>
					</>
				))}
			</div>
			{/*****--------------Course List---------------*****/}
			<div className='space-y-8'>
				<h4 className='font-medium uppercase'>Course list</h4>
				{/*****--------------Course List -> Filter Options---------------*****/}
				<div className='course-list-option-container grid grid-cols-5 gap-4'>
					{/*****--------------Filter Options -> Option---------------*****/}
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Categories</h5>
						<CustomSelect
							onChange={(value) =>
								handleFilters('category', value)
							}
							placeholder='select a category'
							options={categories}
						/>
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Status</h5>
						<CustomSelect
							onChange={(value) => handleFilters('status', value)}
							placeholder='select status'
							options={[
								{ value: '', label: 'All' },
								{ value: 'active', label: 'Active' },
								{ value: 'pending', label: 'Pending' },
								{ value: 'rejected', label: 'Rejected' },
								{ value: 'inactive', label: 'Inactive' },
							]}
						/>
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Level</h5>
						<CustomSelect
							onChange={(value) => handleFilters('level', value)}
							placeholder='select levels'
							options={[
								{ value: '', label: 'All' },
								{ value: 'Beginner', label: 'Beginner' },
								{
									value: 'Intermediate',
									label: 'Intermediate',
								},
								{ value: 'Advanced', label: 'Advanced' },
							]}
						/>
					</div>
					<div className='space-y-1'>
						<h5 className='text-font2 font-medium'>Language</h5>
						<CustomSelect
							onChange={(value) =>
								handleFilters('language', value)
							}
							placeholder='select language'
							options={[
								{ value: '', label: 'All' },
								{ value: 'Bengali', label: 'Bengali' },
								{
									value: 'English',
									label: 'English',
								},
							]}
						/>
					</div>
					<button
						onClick={() => handleFetchFilterCourses(query)}
						disabled={Boolean(!courses)}
						className='px-4 h-[40px] rounded-lg bg-secondary text-white self-end disabled:bg-opacity-25'
					>
						Filter
					</button>
				</div>
			</div>
			{/*****--------------Courses Table---------------*****/}
			<div className='space-y-8'>
				{/*****--------------Search && Show Entries ---------------*****/}
				{/* <div className='flex justify-between items-center'>
					<div className='flex items-center space-x-2'>
						<span>Show</span>
						<span>
							<CustomSelect defaultValue='25' />
						</span>
						<span>entries</span>
					</div>
					<Search
						placeholder='input search text'
						// onSearch={onSearch}
						enterButton
						size='large'
						style={{
							width: '25%',
						}}
					/>
				</div> */}

				{/*****--------------Courses Table---------------*****/}
				<div className=''>
					{isFetching ? (
						<div className='flex h-100 justify-center items-center'>
							<Loading size='medium' />
						</div>
					) : (
						<>
							{!courses ? (
								'no data'
							) : (
								<ManageCoursesTable
									courses={displayCourses}
									loadingStatus={loadingStatus}
									handleApproveCourse={handleApproveCourse}
									handleDeleteCourse={handleDeleteCourse}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageCourses;
