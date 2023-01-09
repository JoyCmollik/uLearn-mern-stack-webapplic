import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import {
	AiFillPlayCircle,
	AiOutlineClockCircle,
	AiOutlineLock,
	AiOutlineReconciliation,
	AiOutlineVideoCamera,
} from 'react-icons/ai';
import {
	BsCheck,
	BsFillBarChartLineFill,
	BsHeart,
	BsPeople,
	BsPlayCircleFill,
	BsShare,
} from 'react-icons/bs';
import {
	MdOutlineAssignment,
	MdOutlineAssignmentReturned,
	MdOutlineQuiz,
} from 'react-icons/md';
import { IoCopy } from 'react-icons/io5';
import './CourseDetailTabs.css';
import CourseDetailCollapse from '../CourseDetailCollapse/CourseDetailCollapse';
import CourseDetailDiscussion from '../CourseDetailDiscussion/CourseDetailDiscussion';
import CourseDetailReview from '../CourseDetailReview/CourseDetailReview';
import CourseDetailInstructor from '../CourseDetailInstructor/CourseDetailInstructor';
import { TbCertificate2 } from 'react-icons/tb';

//tabs
const onChange = (key) => {
	console.log(key);
};

const text1 = [
	`Grasp how Javascript works and it's fundamental concepts`,

	`Understand advanced concepts such as closures, 
	prototypal inheritance, IIFEs, and much more.`,

	`Avoid common pitfalls and mistakes other Javascript
	coders make`,
	`Build your own Javascript framework or library`,
];
const text2 = [
	`	Write solid, good Javascript code`,
	`Drastically improve your ability to
	debug problems in Javascript.`,

	`Understand the source code of 
	popular Javascript frameworks`,

	`Build your own Javascript framework
	or library`,
];
const curriculum = [
	{
		id: 1,
		header: 'New Home',
		playIcon: <AiFillPlayCircle />,
		copyIcon: <IoCopy />,
		desc1: 'introduction',
		desc2: 'Section Intro',
		desc3: 'slide Document',
		introPreview: 'preview',
		introTime: '00.18',
		lockIcon: <AiOutlineLock />,
	},
	{
		id: 2,
		header: 'Javascript Fundamentals',
		playIcon: <AiFillPlayCircle />,
		copyIcon: <IoCopy />,
		desc1: 'Values and Variables',
		desc2: 'Block Label Variable',
		desc3: 'This is Pdf Documetn',
		lockIcon: <AiOutlineLock />,
		videoTime1: '00.18',
	},
	{
		id: 3,
		header: 'Developers Skills',
		playIcon: <AiFillPlayCircle />,
		copyIcon: <IoCopy />,
		desc1: 'Data Types',
		videoTime1: '00.25',
		videoTime2: '00.25',
		desc2: 'Let Const & Var',
		desc3: 'JavaScript Scope',
		lockIcon: <AiOutlineLock />,
	},
	{
		id: 4,
		header: 'Editor Setups',
		playIcon: <AiFillPlayCircle />,
		copyIcon: <IoCopy />,
		desc1: 'Basic Operator',
		videoTime1: '00.25',
		videoTime2: '00.25',
		videoTime3: '02.01',
		desc2: 'Operator Precedence',
		desc3: 'This is Audio Tutorial',
		lockIcon: <AiOutlineLock />,
	},
	{
		id: 5,
		header: 'HTML & CSS Crash Course',
		playIcon: <AiFillPlayCircle />,
		desc1: 'Truthy And Falsy Values',
		videoTime1: '00.25',
		videoTime2: '00.25',
		desc2: 'Boolean Logic',
		lockIcon: <AiOutlineLock />,
	},
	{
		id: 6,
		header: 'Youtube Video',
		playIcon: <AiFillPlayCircle />,
		introPreview: 'preview',
		introPreview2: 'preview',
		desc1: 'Javascript Introduction',
		videoTime1: '00.25',
		videoTime2: '00.25',
		desc2: 'Test video',
	},
];

const enrollDetails = [
	{
		id: 45,
		icon: <AiOutlineClockCircle />,
		title1: 'Course Duration',
		title2: '21 min 42 sec',
	},
	{
		id: 46,
		icon: <BsFillBarChartLineFill />,
		title1: 'Course level',
		title2: 'Higher',
	},
	{
		id: 47,
		icon: <BsPeople />,
		title1: 'Student Enrolled',
		title2: '2',
	},
	{
		id: 48,
		icon: <AiOutlineReconciliation />,
		title1: 'Language',
		title2: 'English',
	},
];
const courseIncludes = [
	{
		id: 61,
		icon: <AiOutlineVideoCamera />,
		courseinfo: '21 min 42 sec Video Lectures',
	},
	{
		id: 62,
		icon: <MdOutlineQuiz />,
		courseinfo: '2 Quizzes',
	},
	{
		id: 63,
		icon: <MdOutlineAssignment />,
		courseinfo: '1 assignment',
	},
	{
		id: 64,
		icon: <MdOutlineAssignmentReturned />,
		courseinfo: '1 Downloadable Resources',
	},
	{
		id: 65,
		icon: <AiOutlineClockCircle />,
		courseinfo: 'Full Lifetime Access',
	},
	{
		id: 67,
		icon: <TbCertificate2 />,
		courseinfo: 'Certification of Completion',
	},
];
const CourseDetailTabs = ({ singleCourse }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const {
		_id,
		courseTitle,
		courseDesc,
		courseMetaDesc,
		courseShortDesc,
		courseOutcomes,
		enrolledStudents,
		coursePrice,
		ourseRequirements,
		level,
		language,
		courseOverviewVidUrl,
	} = singleCourse;
	return (
		<section className='container mx-auto    '>
			<div className='grid grid-cols-12  gap-12'>
				{/*-----------------------tabs--------------------------*/}
				<div className='col-span-8 border -mt-8 bg-white rounded'>
					<Tabs
						className='courseTabStyle course-detail-active-color course-detail-tabs-ink-bar course-detail-tabs-btn course-detail-tabs-nav-wrap course-detail-tabs-tab'
						defaultActiveKey='1'
						onChange={onChange}
						items={[
							{
								label: `Overview`,
								key: '1',
								children: (
									<article className='py-10 pl-10'>
										<h2 className='capitalize text-[33px] pb-5'>
											What you will learn
										</h2>
										<div className='grid grid-cols-2 gap-4'>
											<ul className='flex flex-col space-y-4'>
												{courseOutcomes
													? courseOutcomes
															?.slice(0, 4)
															.map(
																(
																	text,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className='flex items-center space-x-3  whitespace-pre-line'
																	>
																		<span className='block bg-green-200 rounded-full p-1 '>
																			<BsCheck className='text-base text-green-500  ' />{' '}
																		</span>
																		<span className='block text-base'>
																			{
																				text
																			}
																		</span>
																	</li>
																)
															)
													: ''}
											</ul>

											<ul className='flex flex-col space-y-4'>
												{ courseOutcomes?.length > 4
													? courseOutcomes
															?.slice(4, 8)
															.map(
																(
																	text,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className='flex items-center space-x-3  whitespace-pre-line'
																	>
																		<span className='block bg-green-200 rounded-full p-1 '>
																			<BsCheck className='text-base text-green-500  ' />{' '}
																		</span>
																		<span className='block text-base'>
																			{
																				text
																			}
																		</span>
																	</li>
																)
															)
													: ''}
											</ul>
										</div>
										<p className='text-base whitespace-nowrap'>
											{courseShortDesc || ''}
										</p>
									</article>
								),
							},
							{
								label: `Curriculum`,
								key: '2',
								children: (
									<div>
										<CourseDetailCollapse
											curriculum={curriculum}
										/>
									</div>
								),
							},
							{
								label: `Discussion`,
								key: '3',
								children: (
									<div>
										<CourseDetailDiscussion />
									</div>
								),
							},
							{
								label: `Review`,
								key: '4',
								children: (
									<div>
										<CourseDetailReview />
									</div>
								),
							},
							{
								label: `Instructor`,
								key: '5',
								children: (
									<div>
										<CourseDetailInstructor />
									</div>
								),
							},
						]}
					/>
				</div>
				{/*----------------------------enroll course detail--------------------------------*/}
				<div className='col-span-4 border  rounded p-4 bg-white -mt-96 '>
					<div className='relative'>
						<img
							src='https://lmszai.zainikthemes.com/uploads/course/1655545018-UOg3MEPfM6.jpg'
							alt=''
							className=''
						/>
						<div className='absolute top-32 left-48'>
							<BsPlayCircleFill
								onClick={showModal}
								className='text-[#5E3FD7] text-6xl font-medium capitalize bg-white rounded-full '
							/>
							{/* <button
								
							>
								preview
							</button> */}
							<Modal
								title='...'
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								width={800}
								className='course-detail-modal-footer course-detail-modal-header course-detail-modal-close course-detail-modal-content course-detail-modal-body'
							>
								<video controls>
									<source
										src='https://lmszai.zainikthemes.com/uploads/video/1657086898-cloud-syncs-dashboard.mp4'
										type='video/mp4'
									/>
								</video>
							</Modal>
						</div>
						{/*-------------------------------cost------------------------------- */}
						<h3 className='text-[33px]  text-[#040453] font-medium pt-4'>
							$ {coursePrice || ''}
						</h3>
						<div>
							{enrollDetails.map((detail) => (
								<div
									key={detail.id}
									className='flex items-center justify-between space-y-3'
								>
									<div className='flex justify-between items-center text-base'>
										{detail.icon}
										<span className='block text-base  text-font1 ml-3 '>
											{detail.title1}
										</span>
									</div>
									<span className='block text-base  text-font1 '>
										{detail.title2}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='pt-4'>
						<button className='block py-3 rounded-lg bg-[#5E3FD7] text-white text-center w-full text-base'>
							Enroll the Course
						</button>
						<div className='grid grid-cols-2 gap-4 pt-4 px-4'>
							<button className='block py-2 rounded text-[15px] border-2 border-font2 font-medium'>
								<BsHeart className='mr-3 inline' /> Add To
								Wishlist
							</button>
							<button className='block py-2  rounded  text-[15px]  border-2 border-font2 font-medium'>
								<BsShare className='mr-3 inline' /> Share Course
							</button>
						</div>
					</div>
					{/*--------------------------course includes----------------------------*/}
					<div className='pt-10'>
						<h2 className='capitalize text-[21px] font-medium text-[#040453]'>
							This course includes
						</h2>
						<div>
							{courseIncludes.map((course) => (
								<p
									key={course.id}
									className='flex items-center text-base space-x-3 '
								>
									{course.icon}
									<span>{course.courseinfo}</span>
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseDetailTabs;
