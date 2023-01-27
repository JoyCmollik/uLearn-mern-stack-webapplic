import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';

const Category = ({ category, handleDeleteCategory }) => {
	return (
		<article className='flex space-x-4 p-2 border-[0.5px] rounded-lg drop-shadow'>
			<img
				src={category.categoryURL}
				alt='computer science'
				className='w-[100px] h-[70px] object-cover rounded-lg'
			/>
			<div className='flex-grow flex flex-col justify-between'>
				<div className='flex justify-between space-y-2'>
					<h4 className='text-font1 capitalize font-medium tracking-wide'>
						{category.category}
					</h4>
					<div className='flex items-start space-x-2'>
						<Link to={`edit/${category._id}`}>
							<button className='p-1 border border-primary rounded-lg text-xs text-primary'>
								<MdEdit size={16} />
							</button>
						</Link>

						<Popconfirm
							title='Are you sure to delete this category?'
							onConfirm={() => handleDeleteCategory(category._id)}
							okText='Yes'
							cancelText='No'
						>
							<button className='p-1 border border-error bg-error rounded-lg text-xs text-white'>
								<MdDelete size={16} />
							</button>
						</Popconfirm>
					</div>
				</div>

				<div className='flex items-center space-x-1'>
					<img
						className='w-[34px] h-[34px] rounded-full object-cover'
						src={category?.user?.avatarURL}
						alt=''
					/>
					<div className='flex flex-col justify-center'>
						<small className='m-0 font-semibold'>
							<span className='font-light mr-1'>created by</span>
							{category?.user?.name}
						</small>
						<small className='m-0 font-light'>
							{moment(category.createdAt).fromNow()}
						</small>
					</div>
				</div>
			</div>
		</article>
	);
};

export default Category;
