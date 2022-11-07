import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdQuiz } from 'react-icons/md';
import { BiBookReader } from 'react-icons/bi';
const contents = [
	{
		id: 401,
		lessonNo: 1,
		topic: 'Hello,Python',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 402,
		lessonNo: 2,
		topic: 'Function and Getting Help',
		subTitle: `Calling functions and defining our own, and using Python's builtin documentation`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 403,
		lessonNo: 3,
		topic: 'Booleans and Conditionals',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 404,
		lessonNo: 4,
		topic: 'Lists',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 405,
		lessonNo: 5,
		topic: 'Loops and List Comprehensions',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 406,
		lessonNo: 6,
		topic: 'Strings and Dictionaries',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
	{
		id: 407,
		lessonNo: 7,
		topic: 'Working with External Libraries',
		subTitle: `A quick introduction to Python syntax,variable assignment, and numbers`,
		tutorial: <BiBookReader className='text-2xl' />,
		Quiz: <MdQuiz className='text-2xl ' />,
	},
];
const CourseContentTabsCourse = () => {
	const navigate = useNavigate();
	/* 	const [checkIcon, setCheckIcon] = useState(false); */
	/* let icon = <BiBookReader className='text-2xl' />;

	if (!checkIcon) {
		icon = <BiBookReader className='text-2xl' />;
	} else {
		icon = <BsFillCheckCircleFill className='text-2xl ' />;
	} */
	const handleDetailPage = (id) => {
		navigate(`/course-content-detail/${id}`);
	};
	return (
		<section className=' mx-auto pt-6 px-4'>
			<div className='grid grid-cols-12 gap-28'>
				<div className='col-span-8 '>
					{/*----------------------titles------------------------*/}
					<div className='flex justify-between'>
						<h2 className=' text-2xl font-bold'>Lessons</h2>
						<div className='flex justify-between space-x-4'>
							<h2 className=' text-base font-bold'>Tutorial</h2>
							<h2 className=' text-base font-bold'>Quiz</h2>
						</div>
					</div>
					{contents.map((content) => {
						const {
							id,
							lessonNo,
							topic,
							subTitle,
							tutorial,
							Quiz,
						} = content;
						return (
							<div
								onClick={() => handleDetailPage(id)}
								key={id}
								className='flex items-center justify-between border-b-2  border-[#dfdddc]  py-4'
							>
								<article className='pl-4 flex items-center justify-between'>
									<h3 className='text-xl font-bold pr-9'>
										{lessonNo}
									</h3>
									<h4 className='text-base font-bold capitalize'>
										{' '}
										{topic} <br />
										<span className='text-xs font-normal'>
											{subTitle}
										</span>
									</h4>
								</article>

								{/*----------------Tutorial Icon dynamic--------------------*/}
								<article className='grid grid-cols-2 gap-x-8 items-center justify-center pr-1'>
									<div className='flex justify-center'>
										<BiBookReader className='text-2xl' />;
									</div>
									{/*--------------------Quiz Icon----------------------*/}

									<div className='flex justify-center'>
										<MdQuiz className='text-2xl ' />
									</div>
								</article>
							</div>
						);
					})}
				</div>
				{/*----------------------course detail and instructor detail------------------------*/}
				<div className='col-span-4 pl-5'>
					<div className='flex flex-col space-y-4'>
						{/*-------------------content info-----------------*/}
						<article>
							<h2 className='text-base font-semibold'>
								Course Includes
							</h2>
							<span className='text-sm block'>
								Total Lessons: 7
							</span>
							<span className='text-sm block'>Quizzes: 2</span>
							<span className='text-sm block'>
								Course level: higher
							</span>
							<span className='text-sm block'>
								Language: English
							</span>
						</article>
						{/*-----------------instructor info-----------------*/}
						<article>
							<h2 className='text-base font-semibold'>
								About Instructor
							</h2>
							<span className='text-sm block'>
								Name: Johnny Depp
							</span>
							<span className='text-sm block'>
								Position: PHP Developer
							</span>
							<span className='text-sm block'>Rating: 5.0</span>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseContentTabsCourse;
