import { Avatar } from 'antd';
import React from 'react';
import { BsPin, BsThreeDots } from 'react-icons/bs';
import { CaretUpOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const discussionList = [
	{
		id: 4001,
		topicTitle: 'string and dictionaries Q2 and Q3',
		userName: 'Flip Niewczas',
		userImage:
			'https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png',
		lastComment: '1d',
		totalComment: 1,
	},
	{
		id: 4002,
		topicTitle: 'slot machine problem',
		userName: 'Flip Niewczas',
		userImage:
			'https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png',
		lastComment: '1d',
		totalComment: 4,
	},
	{
		id: 4003,
		topicTitle: 'slot machine problem',
		userName: 'Flip Niewczas',
		userImage:
			'https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png',
		lastComment: '1d',
		totalComment: 3,
	},
	{
		id: 4004,
		topicTitle: 'slot machine problem',
		userName: 'Flip Niewczas',
		userImage:
			'https://storage.googleapis.com/kaggle-avatars/thumbnails/default-thumb.png',
		lastComment: '1d',
		totalComment: 13,
	},
];

const CourseContentTabsDiscussionAll = () => {
	const navigate = useNavigate();
	const handleDiscussion = (id) => {
		navigate(`discussionList/${id}`);
	};
	return (
		<section className='px-5'>
			{/* ---------------------pinned topics------------------------------*/}
			<h2>Pinned topics</h2>
			<article className='grid grid-cols-2 border-b border-gray-300 pb-4 '>
				<div className='flex items-center space-x-3'>
					<div className='relative'>
						<Avatar
							size='large'
							src='	https://storage.googleapis.com/kaggle-avatars/thumbnails/2603295-kg.jpg'
							className='p-2 ring-2 ring-black'
						/>
						<div className='absolute top-8 bg-white left-5 border  p-1 rounded-full'>
							<BsPin className='text-base font-bold' />
						</div>
					</div>
					<div>
						<div>
							<span className='block text-base text-font1 font-normal'>
								Welcome to the python course discussion !
							</span>
							<span className='underline font-normal text-sm text-font2'>
								Alexis Cook
							</span>
							<span className='font-normal text-sm text-font2'>
								{' '}
								. Posted 1y ago
							</span>
						</div>
					</div>
				</div>
				<div className='flex justify-end '>
					<div>
						<button className='flex items-center '>
							<div className='border border-font2  rounded-full  '>
								<span className='border border-zinc-800 rounded-y-full rounded-l-full bg-zinc-800 pl-3 pb-1'>
									<CaretUpOutlined
										className='bg-zinc-800 pb-1'
										style={{ color: 'white' }}
									/>{' '}
								</span>
								<span className='px-3 font-bold '>343</span>
							</div>
						</button>
						<div className='flex justify-end pr-2 '>
							<BsThreeDots className='text-lg ml-3' />
						</div>
					</div>
				</div>
			</article>
			{/*-------------------------all other topics----------------------------*/}
			<div>
				<h2>All other topics</h2>
				{discussionList.map((list) => {
					const {
						id,
						topicTitle,
						userName,
						userImage,
						lastComment,
						totalComment,
					} = list;
					return (
						<article
							onClick={() => handleDiscussion(id)}
							key={id}
							className='grid grid-cols-2 border-b border-gray-300 pb-4 mb-4'
						>
							<div className='flex items-center space-x-3'>
								<Avatar
									size='large'
									src={userImage}
									className=''
								/>

								<div>
									<div>
										<span className='block text-base text-font1 font-normal'>
											{topicTitle}
										</span>
										<span className='underline font-normal text-sm text-font2'>
											{userName}
										</span>
										<span className='font-normal text-sm text-font2'>
											{' '}
											. Last Comment {lastComment} ago by{' '}
											{userName}
										</span>
									</div>
								</div>
							</div>
							<div className='flex flex-col justify-end '>
								<div className='flex justify-end'>
									<button className='flex items-center '>
										<div className='border border-font2  rounded-full  '>
											<span className='border border-zinc-800 rounded-y-full rounded-l-full bg-zinc-800 pl-3 pb-1'>
												<CaretUpOutlined
													className='bg-zinc-800 pb-1'
													style={{
														color: 'white',
													}}
												/>{' '}
											</span>
											<span className='px-3 font-bold '>
												{totalComment}
											</span>
										</div>
									</button>
								</div>
								<div className='flex justify-end'>
									<span className='mr-3'>
										{totalComment} comment{' '}
									</span>
									<span>
										<BsThreeDots className='text-lg ' />
									</span>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default CourseContentTabsDiscussionAll;
