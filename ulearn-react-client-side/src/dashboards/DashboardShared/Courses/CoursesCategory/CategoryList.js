import React from 'react';
import Loading from '../../../../components/layout/Loading/Loading';
import Category from './Category';

const CategoryList = ({ categories, handleDeleteCategory }) => {
	return (
		<>
			<h4 className='font-medium uppercase'>Available categories</h4>
			<div className='grid grid-cols-2 gap-4'>
				{!categories ? (
					<div className='col-span-2 flex justify-center items-center'>
						<Loading />
					</div>
				) : (
					<>
						{categories.map((category, categoryIdx) => (
							<Category
								key={categoryIdx}
								category={category}
								handleDeleteCategory={handleDeleteCategory}
							/>
						))}
					</>
				)}
			</div>
		</>
	);
};

export default CategoryList;
