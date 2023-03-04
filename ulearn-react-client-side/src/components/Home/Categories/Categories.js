import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../hooks/useFramerMotion';

const Categories = ({ categories }) => {
	const { ariseVariants, titleVariants } = useFramerMotion();
	return (
		<motion.section
			initial='offscreen'
			whileInView='onscreen'
			viewport={{ once: true, amount: 0.8 }}
			className='container mx-auto '
		>
			{/*--------------- title ----------------------- */}
			<motion.h2 variants={titleVariants} className='text-2xl font-bold'>
				Trending Categories
			</motion.h2>
			<motion.p
				variants={titleVariants}
				className='text-gray-500 text-base font-normal'
			>
				#Browse trending & popular learning topics
			</motion.p>
			<motion.div
				variants={ariseVariants}
				className='grid grid-cols-6 mx-auto gap-4  w-85'
			>
				{categories?.map((item) => {
					const { _id, category, categoryURL } = item;
					return (
						<Link to={`/course-list/category/${_id}`} key={_id}>
							<div key={_id} className='mx-auto text-center'>
								<div>
									<img
										src={categoryURL}
										alt=''
										className='bg-secondary rounded-3xl '
									/>

									<div></div>
								</div>
								<p className='-mt-3 border  rounded-2xl mx-auto text-center text-lg py-2 px-6 bg-white inline-block capitalize hover:bg-primary hover:text-white hover:border-primary'>
									{item?.courses?.length} Course
								</p>
								<h2 className='text-xl text-center tracking-wider capitalize'>
									{' '}
									{category}
								</h2>
							</div>
						</Link>
					);
				})}
			</motion.div>
		</motion.section>
	);
};

export default Categories;
