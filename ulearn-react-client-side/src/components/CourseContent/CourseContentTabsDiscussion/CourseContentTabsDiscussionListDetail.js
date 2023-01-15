import { Avatar, message, Progress, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './CourseContentTabDiscussionListDetail.css';
import {
	CaretDownOutlined,
	CaretUpOutlined,
	UpOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import DashTextEditor from '../../../dashboards/DashboardShared/DashTextEditor/DashTextEditor';
import axios from 'axios';
import { MdOutlineArrowBack } from 'react-icons/md';
import moment from 'moment';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const parse = require('html-react-parser');

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
	const [topic, setTopic] = useState(null);
	const [editorContent, setEditorContent] = useState();
	const [isLoading, setIsLoading] = useState();
	const [triggerFetching, setTriggerFetching] = useState(true);

	// library constants
	const { topicId } = useParams();
	const navigate = useNavigate();

	// function - on component load
	useEffect(() => {
		if (topicId) {
			setIsLoading(true);
			axios
				.get(`/topics/${topicId}`)
				.then((response) => {
					setTopic(response.data.topic);
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
					setTriggerFetching(false);
				});
		}
	}, [topicId]);

	return (
		<div className='mb-20 relative'>
			{/*--------------back---------------------*/}
			<div className='flex justify-end pb-6'>
				<button
					onClick={() => window.history.back()}
					className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize sticky top-[140px]'
				>
					<MdOutlineArrowBack size={20} /> <span>Go Back</span>
				</button>
			</div>
			{isLoading ? (
				<div className='h-[40vh] flex justify-center items-center'>
					{' '}
					<Spin size='large' />{' '}
				</div>
			) : (
				<>
					{topic && (
						<div>
							<div className='grid grid-cols-12 border rounded-lg p-2'>
								{/*---------------------topic author ----------------------------*/}
								<article className='py-8 col-span-2 flex flex-col justify-start items-center space-y-2 bg-light rounded-lg'>
									<div className='rounded-full outline outline-2 outline-primary border-4 border-white'>
										<Avatar
											size={55}
											src={topic?.user?.avatarURL}
											alt={topic?.user.name}
										/>
									</div>

									<div className='text-font2 space-y-1 text-center'>
										<p className='m-0 p-0 font-semibold'>
											{topic?.user?.name}
										</p>
										<p className='m-0 px-4 py-1 text-sm font-light border rounded-lg'>
											{topic?.user?.role}
											{/* {moment(topic.createdAt).fromNow()} */}
										</p>
									</div>
								</article>
								{/*---------------------topic body posted----------------------------*/}
								<article className='col-span-10 p-4 flex flex-col space-y-2'>
									{/*---------------------topic title & vote ----------------------------*/}
									<div className='flex items-center justify-between'>
										{/*---------------------topic title ----------------------------*/}
										<div className=''>
											<h2 className='font-bold text-lg text-font1 p-0 m-0'>
												{topic.topicTitle}
											</h2>
											<p className='m-0 p-0 text-sm text-font2'>
												Posted{' '}
												{moment(
													topic?.createdAt
												).fromNow()}
											</p>
										</div>
										{/*---------------------topic vote ----------------------------*/}
										<div className='border border-font2 rounded-lg flex text-sm text-font1 overflow-hidden'>
											<button className='block px-2 border-r border-font2'>
												<BiUpArrow />
											</button>
											<div className='text-base font-medium px-2'>
												1
											</div>
											<button className=' block px-2 border-l border-font2'>
												<BiDownArrow />
											</button>
										</div>
									</div>
									{/*---------------------topic content ----------------------------*/}
									<div>
										{topic.topicContent
											? parse(topic.topicContent)
											: ''}
									</div>

									{/* <div className='grid grid-cols-10'>
										<div className='col-span-4  ml-[-30px]'>
											<div className='text-primary font-medium grid grid-cols-5  text-center divide-x divide-gray-400 '>
												<div className=''>Quote</div>
												<div className=''>Follow</div>
												<div className=''>Bookmark</div>
												<div className=''>Report</div>
												<div className=''>2 upvote</div>
											</div>
										</div>
									</div> */}
								</article>
							</div>
							<div className='flex justify-between items-center'>
								{/*--------------------------------no of comments-------------------------------*/}
								<h2 className='pt-4 text-base font-normal text-font1'>
									Comments{' '}
									<span> {`(${topic.comments.length})`}</span>
								</h2>
								<div className='flex items-center mt-2'>
									<span className='pr-2'>Sort by</span>
									<Dropdown
										overlay={menu}
										className='border  border-gray-400 rounded'
									>
										<a
											href='/xyz'
											onClick={(e) => e.preventDefault()}
										>
											<div className='flex px-3 space-x-14 items-center justify-between pt-1'>
												<h4 className='text-sm text-font2'>
													Hotness
												</h4>
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
											Okay I figure it out, in question 3
											in line:
											<br />
											{`dictionary[word] =
								word_search(doc_list,**word**) not " keywords "`}
										</p>
										<p>
											that's why It iterates over list,
											not word <br /> Cheers
										</p>
									</div>
								</article>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default CourseContentTabsDiscussionListDetail;
