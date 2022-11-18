import { Avatar, Progress } from 'antd';
import React, { useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './CourseContentTabDiscussionListDetail.css';
import {
	CaretDownOutlined,
	CaretUpOutlined,
	UpOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';

const menu = (
	<Menu
		items={[
			{
				key: '1',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.antgroup.com'
					>
						1st menu item
					</a>
				),
			},
			{
				key: '2',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.aliyun.com'
					>
						2nd menu item
					</a>
				),
				icon: <SmileOutlined />,
			},
			{
				key: '3',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.luohanacademy.com'
					>
						3rd menu item
					</a>
				),
			},
		]}
	/>
);

const CourseContentTabsDiscussionListDetail = () => {
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState();

	const { discussionListId } = useParams();
	const navigate = useNavigate();
	return (
		<div className='mb-20'>
			{/*--------------back---------------------*/}
			<div className='flex justify-end pb-6'>
				<button
					onClick={() => navigate('/course-content/:course-content')}
					className='text-sm font-bold border border-black px-6 py-2 rounded-full'
				>
					Go back
				</button>
			</div>
			<div className='grid grid-cols-12 border border-gray-300 rounded'>
				<article className='col-span-2 border-r border-gray-300 p-5 flex items-start flex-col justify-start'>
					{/*---------------------progress & avatar----------------------*/}
					<div className='relative'>
						<Progress
							type='circle'
							percent={30}
							width={80}
							style={{
								marginRight: 8,
							}}
							strokeColor={{
								from: `green`,
								to: `green`,
							}}
							showInfo={false}
						/>
						<div className='absolute top-2 left-2'>
							<Avatar
								size={64}
								src='https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png'
							/>
						</div>
					</div>

					{/*-----------------set Name-----------------------*/}
					<h2 className='text-base text-sky-400'>Filip Niewczas</h2>
					<p className='border border-sky-400 px-3 text-sky-400 py-1 rounded'>
						Topic Author
					</p>
				</article>
				<article className='col-span-10 pt-8 px-8 pb-2 flex flex-col space-y-5'>
					<div>
						{/*---------------------topic title posted----------------------------*/}
						<div className='flex items-center justify-between'>
							<h2 className='font-bold text-xl text-font1'>
								Strings and Dictionaries Q2 and Q3 error
							</h2>
							<p className=''>
								<CaretUpOutlined className='text-xl ' />
								<br />
								<span className='text-base block pl-1'>1</span>
							</p>
						</div>
						<p className='font-medium text-xs'>
							Posted in{' '}
							<span className='text-primary'>python</span> 3 days
							ago
						</p>
						{/*------------------simple intro-------------------*/}
						<p className='text-sm'>Hi guys,</p>
						{/*--------------------stated problem---------------------*/}
						<p className='text-sm'>
							I have a problem with question 3 in the Strings and
							dictionaries topic.
						</p>
						{/*-------------------error----------------*/}
						<p className='text-sm'>
							When running exercise 3 I got an error:
						</p>

						<p className='text-sm'>
							Incorrect: When calling your function with arguments
							{`	[['The Learn Python Challenge Casino', 'They bought
							a car', 'Casinoville?'], ['casino']],`}
							Python raised the following exception…
							AttributeError: 'list' object has no attribute
							'lower'
						</p>

						<p className='text-sm'>
							The clue is I have even checked solutions and 1-1
							copy and run that, but I still have this error.
						</p>
						<p className='text-sm'>
							I think that this error stems from some mistake in
							question 2 but my code is exactly the same as
							provided in the solution, here it is:
							<br />
							**Code for Question 2: **
							<span className='block'>
								`def word_search(doc_list, keyword):
								<br />
								{`indices =[]`}
								<br />
								for i, doc in enumerate(doc_list):
							</span>
						</p>
						{/*-------------------code----------------------*/}
						<div className='border bg-white p-5 mb-4'>
							<p className='text-sm'>{`tokens = doc.split() normalized =`}</p>
							<p className='text-sm'>{`[token.lower().rstrip('.,') for token in tokens] `}</p>
							<p className='text-sm'>
								{`if keyword.lower() in normalized:  `}
								<br />
								<p className='indent-8'>
									{' '}
									{`indices.append(i) `}
									<br />
									<span> return indices`</span>
								</p>
							</p>
						</div>
						<p className='text-sm'>
							It returns a "correct", but when I tried to run
							Question 3 with the same code as below, it shows me
							an error:
							<br />
							<span className='text-sm font-extrabold'>
								Code for question 3
							</span>
							<br />
							<span className='text-sm border'>
								{`	def multi_word_search(doc_list, keywords):
									dictionary = {} for word in keywords:
									dictionary[word] =`}
							</span>
							<br />
							<span className='text-sm border'>
								{`	word_search(doc_list,keywords) return dictionary`}
							</span>
						</p>
						<p className='text-sm'>
							{`Incorrect: When calling your function with arguments
							[['The Learn Python Challenge Casino', 
						
						`}
							<br />
							<span className='text-sm'>{`	'They bought a car', 'Casinoville?'], ['casino']], Python raised
							the following exception… AttributeError: 'list'
							object has no attribute 'lower'`}</span>
						</p>
						<p>What should I do?</p>
						<p>
							Thanks in advance for your help and wish you a
							pleasant coding!
						</p>
					</div>
					<div className='grid grid-cols-10'>
						<div className='col-span-4  ml-[-30px]'>
							<div className='text-primary font-medium grid grid-cols-5  text-center divide-x divide-gray-400 '>
								<div className=''>Quote</div>
								<div className=''>Follow</div>
								<div className=''>Bookmark</div>
								<div className=''>Report</div>
								<div className=''>2 upvote</div>
							</div>
						</div>
					</div>
				</article>
			</div>
			<div className='flex justify-between items-center'>
				{/*--------------------------------no of comments-------------------------------*/}
				<h2 className='pt-4 text-base font-normal text-black'>
					Comments <span className='text-font2'> {`(1)`}</span>
				</h2>
				<div className='flex items-center mt-2'>
					<span className='pr-2'>Sort by</span>
					<Dropdown
						overlay={menu}
						className='border  border-gray-400 rounded'
					>
						<a href='/xyz' onClick={(e) => e.preventDefault()}>
							<div className='flex px-3 space-x-14 items-center justify-between pt-1'>
								<h4 className='text-sm text-font2'>Hotness</h4>
								<CaretDownOutlined
									className='pb-1'
									style={{ color: 'gray' }}
								/>
							</div>
						</a>
					</Dropdown>
				</div>
			</div>
			{/*------------------------------avatar & text editor---------------------------------*/}
			<div className='grid grid-cols-12 gap-4 pt-8'>
				<article className='col-span-1 flex justify-end'>
					{/*---------------------progress & avatar----------------------*/}
					<div className='relative'>
						<Progress
							type='circle'
							percent={30}
							width={48}
							style={{
								marginRight: 8,
							}}
							strokeColor={{
								from: `green`,
								to: `green`,
							}}
							showInfo={false}
						/>
						<div className='absolute top-1 left-1'>
							<Avatar
								size='large'
								src='https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png'
							/>
						</div>
					</div>
				</article>
				<article className='col-span-11'>
					{/*---------------------text editor----------------------*/}
					<div>
						<DashTextEditor
							editor={editor}
							editorContent={editorContent}
							setEditorContent={setEditorContent}
						/>
					</div>
					<div className='flex justify-end py-8'>
						<button className='text-sm font-bold text-white px-6 py-2 bg-zinc-800 rounded-full'>
							Post Comment
						</button>
					</div>
				</article>
			</div>
			{/*----------------------------reply----------------------*/}
			<div className='grid grid-cols-12 gap-4 pt-8'>
				<article className='col-span-1 flex justify-end'>
					{/*---------------------progress & avatar----------------------*/}
					<div className='relative'>
						<Progress
							type='circle'
							percent={30}
							width={48}
							style={{
								marginRight: 8,
							}}
							strokeColor={{
								from: `green`,
								to: `green`,
							}}
							showInfo={false}
						/>
						<div className='absolute top-1 left-1'>
							<Avatar
								size='large'
								src='https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png'
							/>
						</div>
					</div>
				</article>
				<article className='col-span-11'>
					{/*---------------------replied----------------------*/}
					<div className='border pt-5 px-5'>
						<div className='grid grid-cols-2'>
							<div className='flex space-x-8'>
								<h2 className='text-sm text-sky-400'>
									Filip Niewczas
									<span className='ml-2 border text-sm border-sky-400 px-2 text-sky-400  rounded'>
										Topic Author
									</span>
								</h2>
								<div className=''>
									<ul className='list-disc flex space-x-6 indent-[-10%] text-font2'>
										<li>2 days ago </li>
										<li>Options</li>
										<li>Report </li>
										<li>Reply</li>
									</ul>
								</div>
							</div>

							<div className='flex justify-end items-center'>
								<div className='border px-3 py-[6px]'>
									<UpOutlined className='text-sm py-1 flex items-center' />
								</div>
								<div className='border text-lg px-3 py-1'>
									1
								</div>
							</div>
						</div>
						<p className='pb-4'>
							Okay I figure it out, in question 3 in line:
							<br />
							{`dictionary[word] =
								word_search(doc_list,**word**) not " keywords "`}
						</p>
						<p>
							that's why It iterates over list, not word <br />{' '}
							Cheers
						</p>
					</div>
				</article>
			</div>
		</div>
	);
};

export default CourseContentTabsDiscussionListDetail;
