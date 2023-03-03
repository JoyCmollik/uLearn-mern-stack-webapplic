import React, { useEffect } from 'react';
import CommentNotification from './CommentNotification';
import UpVoteNotification from './UpVoteNotification';

const NotificationComponent = ({ notifications }) => {
	return (
		<div className='p-4 bg-white space-y-2 drop-shadow-lg rounded-lg max-h-[400px] border overflow-auto'>
			<h4 className='m-0'>Your notifications</h4>
			<hr />
			<div className='space-y-1'>
				{!notifications.length > 0 ? (
					'No notifications.'
				) : (
					<>
						{notifications.map((n, nIdx) => (
							<article key={nIdx}>
								{n.type === 'newVote' && (
									<UpVoteNotification data={n} />
								)}
								{n.type === 'newComment' && (
									<CommentNotification data={n} />
								)}
							</article>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default NotificationComponent;
