import React from 'react';
import { MdOutlineControlPointDuplicate } from 'react-icons/md';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

const CoursesCategory = () => {
	const location = useLocation();

	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Categories</h4>
				{/* add new course */}
				{location.pathname.includes('add') ? null : <Link to='add'>
					<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
						<MdOutlineControlPointDuplicate size={20} />{' '}
						<span>Add new category</span>
					</button>
				</Link> }
			</div>
			<div className='space-y-8 min-h-[71vh] '>
				<Routes>
					<Route index element={<CategoryList />} />
					<Route path='add' element={<AddCategory />} />
				</Routes>
			</div>
		</div>
	);
};

export default CoursesCategory;
