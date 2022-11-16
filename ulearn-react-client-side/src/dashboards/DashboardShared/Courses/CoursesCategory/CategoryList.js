import React from 'react';

const Category = () => {
    return (
		<article className='flex justify-between space-x-4 p-2 border-[0.5px] rounded-lg drop-shadow'>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpXHS4djcVyDusP4rBKwI_u-rnw-_NP6-JQ&usqp=CAU'
				alt='computer science'
				className='w-[100px] h-[70px] object-cover rounded-lg'
			/>
			<div className='flex-grow flex flex-col justify-start space-y-2'>
				<h4 className='text-font1 capitalize font-medium tracking-wide'>
					Computer Science & Engineering
				</h4>
				<div className='space-x-2'>
					<button className='px-4 py-1 border border-primary rounded-lg text-xs text-primary'>
						edit
					</button>
					<button className='px-4 py-1 border border-error bg-error rounded-lg text-xs text-white'>
						delete
					</button>
				</div>
			</div>
		</article>
	);
}

const CategoryList = () => {
  return (
		<>
			<h4 className='font-medium uppercase'>Available categories</h4>
			<div className='grid grid-cols-3 gap-4'>
				<Category />
				<Category />
				<Category />
				<Category />
			</div>
		</>
  );
}

export default CategoryList