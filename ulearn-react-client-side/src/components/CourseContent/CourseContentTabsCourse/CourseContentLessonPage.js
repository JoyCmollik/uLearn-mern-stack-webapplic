import { PageHeader, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';

// image
import nodataImg from '../../../images/no_data.png';

const parse = require('html-react-parser');

const CourseContentLessonPage = ({ currSection }) => {
	const [currLesson, setCurrLesson] = useState(null);
	const { lessonId } = useParams();

	useEffect(() => {
		if (lessonId && currSection.lessons) {
			setCurrLesson(() => {
				return currSection.lessons.find(
					(lesson) => lesson._id === lessonId
				);
			});
		}
	}, [lessonId, currSection]);

	return (
		<div className='relative'>
			{!currLesson ? (
				<div className='h-[40vh] flex justify-center items-center'>
					<Spin />
				</div>
			) : (
				<div className='relative'>
					<div className='flex items-center space-x-4 bg-light p-4 rounded-lg sticky top-[85px] z-40'>
						<button onClick={() => window.history.back()}>
							<HiArrowLeft size={24} />
						</button>
						<h4 className='text-xl m-0 font-bold'>
							{currLesson?.lessonTitle
								? `Lesson: ${currLesson?.lessonTitle}`
								: `No Title`}
						</h4>
					</div>
					<div className='p-4'>
						{currLesson.lessonContent ? (
							parse(currLesson.lessonContent)
						) : (
							<img
								className='max-w-[500px] mx-auto'
								src={nodataImg}
								alt='lesson_content'
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseContentLessonPage;
