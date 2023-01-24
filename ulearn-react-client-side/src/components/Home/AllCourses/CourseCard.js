import React, { useEffect, useState } from 'react';
import { BiNotepad } from 'react-icons/bi';
import { Avatar, Divider, Rate } from 'antd';
import { TbExternalLink } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi2';
const CourseCard = (props) => {
	const navigate = useNavigate();
	const handleDetailPage = (id) => {
		navigate(`/course-list/${id}`);
	};
	const {
		courseTitle,
		instructor,
		courseThumb,
		currLearners,
		level,
		averageRating,
		sections,
		_id,
	} = props.course;
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [value, setValue] = useState(averageRating);
	return (
		<div className='mx-auto shadow border  rounded-lg '>
			<div className='px-4 pt-4 '>
				{/* ----------------------card image--------------------------- */}
				<img
					src={courseThumb && courseThumb}
					alt='course'
					className='rounded-xl object-cover w-[400px] h-[300px]'
				/>
			</div>
			<div className='px-5 py-3'>
				<p className='inline-block text-xs text-left capitalize border border-primary text-primary py-1 px-2 rounded-md'>
					{level}
				</p>
				<h2 className='card-title text-base font-semibold text-dark'>
					{courseTitle ? courseTitle : ''}
				</h2>
				{/* ------------------------rating-------------------- */}
				<span>
					<Rate
						tooltips={desc}
						onChange={setValue}
						value={value && value}
					/>
					{value ? (
						<span className='ant-rate-text'>{desc[value - 1]}</span>
					) : (
						''
					)}
				</span>
				{/*------------------------- avatar-------------------- */}
				<div className='flex mt-3 justify-between'>
					<div className='flex justify-center items-center space-x-2'>
						<Avatar src={instructor?.avatarURL} />
						<h4 className='m-0 font-medium'>
							{instructor?.name.split(' ')[0]}
						</h4>
					</div>

					<button
						onClick={() => handleDetailPage(_id)}
						className='text-[13px]  capitalize  bg-blue-100 hover:bg-primary text-primary hover:text-white py-1 px-4 rounded-md flex items-center font-medium '
					>
						<TbExternalLink className='text-base mr-2 ' /> view
					</button>
				</div>
				<Divider />
				{/*-------------------------- card footer----------------------- */}
				<div className='flex justify-between'>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary'>
						<HiOutlinePencil />
						{currLearners?.length} Learner
					</div>
					<div className='text-sm flex items-center gap-2 text-dark hover:text-primary capitalize'>
						<BiNotepad />
						{sections && sections?.length} section
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
