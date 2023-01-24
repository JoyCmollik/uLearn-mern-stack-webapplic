import React from 'react';

const Categories = ({ categories }) => {
	return (
		<section className='container mx-auto '>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Trending Categories</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Browse trending & popular learning topics
			</p>
			<div className='grid grid-cols-6 mx-auto gap-4  w-85'>
				{categories?.map((item) => {
					const { _id, category, categoryURL } = item;
					return (
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
					);
				})}
			</div>
		</section>
	);
};

export default Categories;
