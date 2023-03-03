import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { Tabs } from 'antd';
import CourseContentTabsDiscussionAll from './CourseContentTabsDiscussionAll';
import { MdOutlineControlPointDuplicate } from 'react-icons/md';
import CourseContentTabsDiscussionOwned from './CourseContentTabsDiscussionOwned';

const CourseContentDiscussionList = ({ isLoading, courseTopics }) => {
	const onChange = (key) => {
		console.log(key);
	};
	return (
		<section className='space-y-4'>
			<article className='grid grid-cols-2 justify-between'>
				{/*------------------title--------------------*/}
				<div>
					<h2 className='text-2xl'>Discussion Panel</h2>
				</div>
				<div className=' flex items-center justify-end space-x-6'>
					{/*--------------add new topic---------------------*/}
					<div>
						<Link to='addTopic'>
							<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'>
								<MdOutlineControlPointDuplicate size={20} />{' '}
								<span>Add new topic</span>
							</button>
						</Link>
					</div>
				</div>
			</article>

			{/*----------------------------------Tabs-----------------------------*/}
			<article className=' '>
				<div className=' '>
					<Tabs
						defaultActiveKey='1'
						onChange={onChange}
						items={[
							{
								label: `All`,
								key: '1',
								children: (
									<div>
										<CourseContentTabsDiscussionAll
											courseTopics={courseTopics}
											isLoading={isLoading}
										/>
									</div>
								),
							},
							{
								label: `Owned`,
								key: '2',
								children: (
									<CourseContentTabsDiscussionOwned
										isLoading={isLoading}
										courseTopics={courseTopics}
									/>
								),
							},
							// {
							// 	label: `Bookmarks`,
							// 	key: '3',
							// 	children: `Content of Tab Pane 3`,
							// },
						]}
					/>
				</div>
			</article>
		</section>
	);
};

export default CourseContentDiscussionList;
