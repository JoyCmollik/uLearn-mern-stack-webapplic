import React, { useState } from 'react';
import { BiTimeFive, BiNotepad } from 'react-icons/bi';
import { Avatar, Divider, Rate } from 'antd';
const CourseCard = (props) => {
	const { title, price, avatar, img, time, lecture, status } = props.course;
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [value, setValue] = useState(3);

	return (
		<div className='w-72 bg-white drop-shadow-md mx-auto border border-gray-200 rounded-lg'>
			<div className='px-4 pt-4 relative'>
				{/* ----------------------card image--------------------------- */}
				<img
					src={img}
					alt='course'
					className='rounded-xl object-cover'
				/>
				{/* -------------------------$course price---------------------------- */}
				<div className='absolute top-3 right-4'>
					<button className='btn-sm btn-active bg-green-600 text-white font-semibold rounded-lg'>
						$ {price}
					</button>
				</div>
			</div>
			<div className='px-5 py-3'>
				<p className='text-xs text-left capitalize bg-primary text-white w-16 py-1 px-2 rounded-md'>
					{status}
				</p>
				<h2 className='card-title text-base font-semibold text-dark'>
					{title}
				</h2>
				{/* ------------------------rating-------------------- */}
				<span>
					<Rate tooltips={desc} onChange={setValue} value={value} />
					{value ? (
						<span className='ant-rate-text'>{desc[value - 1]}</span>
					) : (
						''
					)}
				</span>
				{/*------------------------- avatar-------------------- */}
				<div className='flex mt-3 '>
					<Avatar.Group>
						<Avatar src={avatar} />
						<Avatar
							style={{ background: 'white' }}
							src='https://joeschmoe.io/api/v1/random'
						/>
					</Avatar.Group>
				</div>
				<Divider />
				{/*-------------------------- card footer----------------------- */}
				<div className='flex justify-between'>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary'>
						<BiTimeFive />
						{time} Hours
					</div>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary'>
						<BiNotepad />
						{lecture} Lecture
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
