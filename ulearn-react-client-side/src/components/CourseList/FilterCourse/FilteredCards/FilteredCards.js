import { Avatar, Pagination, Rate } from 'antd';
import React, { useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { RiClosedCaptioningFill } from 'react-icons/ri';
import { TbExternalLink } from 'react-icons/tb';
const filterCategories = [
	{
		id: 73,
		img: 'https://demo.creativeitem.com/academy/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_11651968000.jpg',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		subtitle:
			'In 2020, build a beautiful responsive Wordpress site that lo...',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',

		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
		language: 'English',
		price: '$50.00',
		rating: '1',
	},
	{
		id: 74,
		img: 'https://demo.creativeitem.com/academy/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_11651968000.jpg',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		subtitle:
			'In 2020, build a beautiful responsive Wordpress site that lo...',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',

		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
		language: 'English',
		price: 'Free',
		rating: '0',
	},
	{
		id: 75,
		img: 'https://demo.creativeitem.com/academy/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_11651968000.jpg',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		subtitle:
			'In 2020, build a beautiful responsive Wordpress site that lo...',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',

		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
		language: 'English',
		price: '$50.00',
		rating: '0',
	},
	{
		id: 76,
		img: 'https://demo.creativeitem.com/academy/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_11651968000.jpg',
		title: 'Wordpress for Beginners - Master Wordpress Quickly',
		subtitle:
			'In 2020, build a beautiful responsive Wordpress site that lo...',
		avatar: 'https://i.ibb.co/FK6MgkL/0269091217f95c25ac4f77c1bd69879a.jpg',

		time: '01:10:09',
		lecture: '12',
		status: 'beginner',
		language: 'English',
		price: 'Free',
		rating: '1',
	},
];

const FilteredCards = () => {
	//rating

	const [value, setValue] = useState(5);
	//pagination
	const [current, setCurrent] = useState(1);
	const onChange = (page) => {
		console.log(page);
		setCurrent(page);
	};
	return (
		<section className='p-4 '>
			<div className=''>
				{filterCategories.map((category) => {
					const {
						img,
						title,
						subtitle,
						price,
						avatar,
						lecture,
						time,
						status,
						rating,
						language,
						id,
					} = category;
					return (
						<div
							key={id}
							className='  rounded-lg grid grid-cols-9  '
						>
							{/* ----------------------card image--------------------------- */}
							<div className=' col-span-2 py-[10px] pl-[10px]'>
								<img
									src={img}
									alt='course'
									className='rounded-xl '
								/>
							</div>
							{/* ----------------------card body--------------------------- */}
							<article className='py-[10px] px-[20px] col-span-4 '>
								{/* ----------------------card title--------------------------- */}
								<h2 className='card-title text-base font-semibold text-dark whitespace-nowrap'>
									{title}
								</h2>
								<h3 className='text-[13px]  capitalize text-font2 whitespace-nowrap'>
									{subtitle}
								</h3>
								{/* ----------------------icons--------------------------- */}
								<div className='flex space-x-4 items-center'>
									<p className='flex items-center'>
										<BsFillPlayCircleFill className='inline-block text-base mr-2 text-font2' />
										<span className='text-sm'>
											{lecture}
											lessons
										</span>
									</p>
									<p className='flex items-center'>
										<BiTimeFive className='inline-block text-base mr-2 text-font2' />
										<span className='text-sm'>
											{time} Hours
										</span>
									</p>
									<p className='flex items-center'>
										<RiClosedCaptioningFill className='inline-block text-base mr-2 text-font2' />
										<span className='text-sm'>
											{language}
										</span>
									</p>
								</div>
								{/*------------------------- status and view-------------------- */}
								<div className='flex space-x-6'>
									<p className='text-[13px]  capitalize bg-primary text-white py-1 px-4 rounded-md'>
										{status}
									</p>
									<p className='text-[13px]  capitalize  bg-blue-100 text-primary py-1 px-4 rounded-md flex items-center font-medium'>
										<TbExternalLink className='text-base mr-2 text-primary' />{' '}
										view
									</p>
								</div>
								{/*------------------------- avatar-------------------- */}
								<div className=''>
									<Avatar.Group>
										<Avatar src={avatar} />
										<Avatar
											style={{ background: 'white' }}
											src='https://joeschmoe.io/api/v1/random'
										/>
									</Avatar.Group>
								</div>
							</article>
							{/*----------------------------card footer---------------------------*/}
							<article className='col-span-3 pt-[10px] pb-[15px] px-[25px] flex flex-col justify-end items-end'>
								{/* -------------------------$course price---------------------------- */}
								<p className='font-semibold  text-lg text-black'>
									{price}
								</p>
								{/* ------------------------rating-------------------- */}
								<p>
									<span>
										<Rate
											onChange={setValue}
											value={value}
										/>
										{value ? (
											<span className='ant-rate-text'>
												{value}
											</span>
										) : (
											''
										)}
									</span>
								</p>
								<p className='text-[13px]'>{rating} Ratings</p>
							</article>
						</div>
					);
				})}
			</div>
			{/*-------------------------pagination-------------------------*/}
			<div className='mt-16'>
				<Pagination
					current={current}
					onChange={onChange}
					total={200 / 10}
				/>
			</div>
		</section>
	);
};

export default FilteredCards;
