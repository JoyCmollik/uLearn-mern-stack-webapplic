import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FcLike } from 'react-icons/fc';

const UpVoteNotification = ({ data }) => {
	const { sender, topic, course, isRead } = data;
	return (
		<article
			className={`border rounded-lg flex p-0 overflow-hidden space-x-2 ${
				isRead ? 'bg-white' : 'bg-light'
			}`}
		>
			<div className='p-2 bg-light flex justify-center items-center relative'>
				<img
					className='w-10 h-10 rounded-full ring-[2px] ring- ring-primary'
					src={sender?.avatarURL}
					alt=''
				/>{' '}
				<div className='absolute bottom-2 p-1 right-0 bg-light rounded-full flex justify-center items-center backdrop-filter'>
				<FcLike size={12} />
				</div>
			</div>
			<div className='p-2 flex-grow flex flex-col text-sm'>
				{/* notification */}
				<div className='font-medium flex-grow text-font1 flex items-center m-0 space-x-1'>
					<span className='underline'>{sender?.name}</span>{' '}
					<span>has upvoted on your topic</span>
					<Link
						to={`/course-content/${course?.id}/discussions/topics/${topic?.id}`}
					>
						<span className='text-primary'>
							{topic?.topicTitle?.split(' ', 5).join(' ')}
							{topic?.topicTitle?.split(' ').length > 5
								? '....'
								: null}
						</span>
					</Link>
				</div>
				{/* time */}
				<small className='text-font2 self-start'>
					{moment(data?.createdAt).calendar()}
				</small>
			</div>
		</article>
	);
};

export default UpVoteNotification;
