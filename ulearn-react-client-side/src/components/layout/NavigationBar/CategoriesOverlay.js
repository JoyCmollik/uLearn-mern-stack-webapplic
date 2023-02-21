import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesOverlay = ({ categories }) => {
	return (
		<div className='w-[580px] bg-white rounded-2xl drop-shadow p-4 grid grid-cols-3 gap-2'>
			{!categories.length > 0 ? null : (
				<>
					{categories.map((c) => (
						<Link to={`/course-list/category/${c?._id}`} key={c?._id}>
							<motion.article
								key={c?._id}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{scale: 1.04}}
								className='border rounded-lg overflow-hidden flex space-x-1 h-[50px]'
							>
								<img
									className='w-[50px] h-full object-cover'
									src={c?.categoryURL}
									alt='category'
								/>
								<div className='p-0.5 flex-grow text-start'>
									<h4 className='text-xs capitalize font-light'>
										{c?.category}
									</h4>
								</div>
							</motion.article>
						</Link>
					))}
				</>
			)}
		</div>
	);
};

export default CategoriesOverlay;
