import { PageHeader, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
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
			    return currSection.lessons.find((lesson) => lesson._id === lessonId);
			})
		}
	}, [lessonId, currSection]);

	return (
		<div className='relative'>
			{!currLesson ? (
				<div className='h-[40vh] flex justify-center items-center'>
					<Spin />
				</div>
			) : (
				<PageHeader
					onBack={() => window.history.back()}
					title={
						currLesson?.lessonTitle
							? `Lesson: ${currLesson?.lessonTitle}`
							: `No Title`
					}
				>

					<div>
						{currLesson.lessonContent ? (
							parse(currLesson.lessonContent)
						) : (
							<img className='max-w-[500px] mx-auto' src={nodataImg} alt='lesson_content' />
						)}
					</div>
				</PageHeader>
			)}
		</div>
	);
};

export default CourseContentLessonPage;
