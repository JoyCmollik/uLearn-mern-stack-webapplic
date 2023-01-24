import { Popconfirm, Rate, Tag } from 'antd';
import React from 'react';
import { HiOutlineEye } from 'react-icons/hi2';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const ContentCreatorCourse = ({
	courseItem,
	handleDeleteCourse,
	loadingStatus,
}) => {
	const {
		_id,
		courseTitle,
		status,
		category,
		courseThumb,
		averageRating,
		currLearners,
		numberOfReviews,
		sections,
		createdAt,
		updatedAt,
	} = courseItem;
	return (
		<>
			{/*****-------------- single course ---------------*****/}
			<article className='grid grid-cols-12 gap-4 rounded-lg bg-white drop-shadow overflow-hidden'>
				{/*****-------------- course image ---------------*****/}
				<img
					className='col-span-3 object-cover'
					src={courseThumb}
					alt='course'
				/>
				{/*****-------------- course content ---------------*****/}
				<div className='col-span-9 p-4 flex flex-col justify-between'>
					{/*****-------------- course top ---------------*****/}
					<div className=''>
						<div className='flex justify-between items-center'>
							{/*****-------------- course title and category ---------------*****/}
							<div className='flex items-center space-x-4'>
								<h4 className='text-lg m-0'>{courseTitle}</h4>
								<Tag
									color={
										status === 'pending' ? 'yellow' : 'blue'
									}
								>
									{status}
								</Tag>
								<div className='capitalize text-xs px-2 py-1 border border-font2 text-font2 rounded-lg'>
									{category.name}
								</div>
							</div>
							{/*****-------------- course action ---------------*****/}
							<div className='drop-shadow flex items-center space-x-2'>
								{/*****-------------- course action ---------------*****/}
								<Link to={`/course-content/${_id}`}>
									<button className='text-sky-500 p-1 rounded-lg border border-sky-500'>
										<HiOutlineEye size={16} />
									</button>
								</Link>
								<Link to={`edit/${_id}`}>
									<button className='text-primary p-1 rounded-lg border border-primary'>
										<MdModeEditOutline size={16} />
									</button>
								</Link>
								<Popconfirm
									title='Are you sure to delete this course?'
									onConfirm={() => handleDeleteCourse(_id)}
									okText='Yes'
									cancelText='No'
								>
									<button className='text-error p-1 rounded-lg border border-error'>
										{loadingStatus?.isDeleting &&
										loadingStatus.currCourse === _id ? (
											<LoadingOutlined
												style={{
													fontSize: 18,
												}}
												spin
											/>
										) : (
											<MdDeleteOutline size={18} />
										)}
									</button>
								</Popconfirm>
							</div>
						</div>
						{/*****-------------- course rating ---------------*****/}
						<Rate
							value={averageRating}
							style={{ fontSize: 16 }}
							disabled
						/>
					</div>
					{/*****-------------- course stats ---------------*****/}
					<div className='flex items-center space-x-8'>
						{/*****-------------- created at ---------------*****/}
						<div className='space-y-1'>
							<p className='uppercase text-xs tracking-wider text-font2 m-0 p-0'>
								Created At
							</p>
							<h4 className='text-base text-font1 m-0 p-0 '>
								{moment(createdAt).format('LL')}
							</h4>
						</div>
						{/*****-------------- updated at ---------------*****/}
						<div className='space-y-1'>
							<p className='uppercase text-xs tracking-wider text-font2 m-0 p-0'>
								Last Updated
							</p>
							<h4 className='text-base text-font1 m-0 p-0 '>
								{moment(updatedAt).fromNow()}
							</h4>
						</div>
						{/*****-------------- sections ---------------*****/}
						<div className='space-y-1'>
							<p className='uppercase text-xs tracking-wider text-font2 m-0 p-0'>
								Sections
							</p>
							<h4 className='text-base text-font1 m-0 p-0 '>
								{sections.length}
							</h4>
						</div>
						{/*****-------------- learners ---------------*****/}
						<div className='space-y-1'>
							<p className='uppercase text-xs tracking-wider text-font2 m-0 p-0'>
								Learners
							</p>
							<h4 className='text-base text-font1 m-0 p-0 '>
								{currLearners.length}
							</h4>
						</div>
						{/*****-------------- reviews ---------------*****/}
						<div className='space-y-1'>
							<p className='uppercase text-xs tracking-wider text-font2 m-0 p-0'>
								reviews
							</p>
							<h4 className='text-base text-font1 m-0 p-0 '>
								{numberOfReviews ? numberOfReviews : '0'}
							</h4>
						</div>
					</div>
				</div>
			</article>
		</>
	);
};

export default ContentCreatorCourse;
