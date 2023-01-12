import React, { useEffect, useState } from 'react';
import { MdOutlineControlPointDuplicate } from 'react-icons/md';
import {
	Routes,
	Route,
	Link,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

// component imports
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import EditCategory from './EditCategory';

const CoursesCategory = () => {
	const [categories, setCategories] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [triggerFetch, setTriggerFetch] = useState(true);

	// library constants
	const location = useLocation();
	const navigate = useNavigate();

	// ON MOUNT DATA FETCHING
	useEffect(() => {
		if (triggerFetch) {
			axios
				.get('/categories')
				.then((response) => {
					console.log(response.data);
					setCategories(response.data.categories);
				})
				.catch((error) => {
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
					setTriggerFetch(false);
				});
		}
	}, [triggerFetch]);

	// API calls
	// ----- function : to create a new category -----
	const handleCreateCategory = async (categoryData) => {
		setIsLoading(true);
		let isCreated = false;
		axios
			.post(`/categories`, categoryData)
			.then((response) => {
				console.log(response.data);
				isCreated = true;
				message.success('New category created successfully!');

				setTriggerFetch(true);
				navigate('/admin/dashboard/manage-courses/categories');
			})
			.catch((error) => {
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
				return isCreated;
			});
	};

	// ----- function : to update  category -----
	const handleUpdateCategory = async (categoryData) => {
		setIsLoading(true);
		let isUpdated = false;
		axios
			.patch(`/categories/${categoryData._id}`, categoryData)
			.then((response) => {
				console.log(response.data);
				isUpdated = true;
				message.success('Awesome! Category updated successfully!');
				setTriggerFetch(true);
				navigate('/admin/dashboard/manage-courses/categories');
			})
			.catch((error) => {
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
				return isUpdated;
			});
	};

	// ----- function : to update  category -----
	const handleDeleteCategory = async (categoryId) => {
		setIsLoading(true);
		axios
			.delete(`/categories/${categoryId}`)
			.then((response) => {
				console.log(response.data);
				message.success('Selected category deleted successfully!');
				setTriggerFetch(true);
			})
			.catch((error) => {
				message.error(error.response.data.msg || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Categories</h4>
				{/* add new course */}
				{location.pathname.includes('add') ? null : (
					<Link to='add'>
						<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
							<MdOutlineControlPointDuplicate size={20} />{' '}
							<span>Add new category</span>
						</button>
					</Link>
				)}
			</div>
			<div className='space-y-8 min-h-[71vh] '>
				<Routes>
					<Route
						index
						element={
							<CategoryList
								categories={categories}
								handleDeleteCategory={handleDeleteCategory}
							/>
						}
					/>
					<Route
						path='add'
						element={
							<AddCategory
								isLoading={isLoading}
								handleCreateCategory={handleCreateCategory}
							/>
						}
					/>
					<Route
						path='edit/:id'
						element={
							<EditCategory
								isLoading={isLoading}
								handleUpdateCategory={handleUpdateCategory}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default CoursesCategory;
