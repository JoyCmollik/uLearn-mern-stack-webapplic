import React from 'react';
import CourseCard from './CourseCard';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../hooks/useFramerMotion';

const NewestCourses = ({ newCourses }) => {
	const { cardVariants, titleVariants } = useFramerMotion();
	return (
		<motion.section
			className=' container mx-auto '
			initial='offscreen'
			whileInView='onscreen'
			viewport={{ once: true, amount: 0.8 }}
		>
			{/*--------------- title ----------------------- */}
			<motion.h2 variants={titleVariants} className='text-2xl font-bold'>
				Newest Courses
			</motion.h2>
			<motion.p
				variants={titleVariants}
				className='text-gray-500 text-base font-normal'
			>
				#Recently published courses
			</motion.p>
			<div className='grid grid-cols-4 gap-4 mx-auto'>
				{newCourses?.slice(0, 4).map((course) => (
					<motion.div key={course?._id} variants={cardVariants}>
						<CourseCard key={course?._id} course={course} />
					</motion.div>
				))}
			</div>
		</motion.section>
	);
};

export default NewestCourses;
