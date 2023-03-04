import React from 'react';
import useFramerMotion from '../../../hooks/useFramerMotion';
import CourseCard from './CourseCard';
import { motion } from 'framer-motion';

const BestReviewedCourses = ({ bestCourses }) => {
	const { cardVariants, titleVariants } = useFramerMotion();

	return (
		<motion.section
			initial='offscreen'
			whileInView='onscreen'
			viewport={{ once: true, amount: 0.8 }}
			className=' container mx-auto'
		>
			{/*--------------- title ----------------------- */}
			<motion.h2 variants={titleVariants} className='text-2xl font-bold'>
				Best Reviewd Courses
			</motion.h2>
			<motion.p
				variants={titleVariants}
				className='text-gray-500 text-base font-normal'
			>
				#Enjoy high quality and best reviewed content In Progress
			</motion.p>
			<div className='grid grid-cols-4 gap-4 mx-auto'>
				{bestCourses?.slice(0, 4).map((course) => (
					<motion.div key={course?._id} variants={cardVariants} >
						<CourseCard key={course._id} course={course} />
					</motion.div>
				))}
			</div>
		</motion.section>
	);
};

export default BestReviewedCourses;
