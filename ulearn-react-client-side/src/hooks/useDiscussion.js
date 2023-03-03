import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import useAuth from './useAuth';
import useSocket from './useSocket';

const useDiscussion = () => {
	const { user: currUser } = useAuth();
	const { socket } = useSocket();

	// function - vote a topic
	const handleUpVoteTopic = (topicId, setTopicVotes) => {
		if (socket.current) {
			console.log('socket found.');
			socket.current.emit(
				'voteTopic',
				{
					topicId,
					sender: {
						id: currUser?.userId,
						name: currUser?.name,
						avatarURL: currUser?.avatarURL,
					},
				},
				(error) => {
					if(error) {
						message.error(error)
					} else {
						message.success('Upvoted.');
						setTopicVotes((prevVotes) => {
							return [currUser?.userId, ...prevVotes];
						});
					}
				}
			);
		} else {
			axios
				.patch('/topics/upvote', { topicId })
				.then((response) => {
					message.success(response.data.msg);
					setTopicVotes((prevVotes) => {
						return [currUser?.userId, ...prevVotes];
					});
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {});
		}
	};

	// function - unvote a topic
	const handleDownVoteTopic = (topicId, setTopicVotes) => {
		if (socket.current) {
			console.log('socket found.');
			socket.current.emit(
				'unVoteTopic',
				{
					topicId,
					userId: currUser?.userId,
				},
				() => {
                    message.success('Downvoted.');
                    setTopicVotes((prevVotes) => {
                        const updatedVotes = [...prevVotes];
                        const indexOf = updatedVotes.indexOf(currUser?.userId);
                        updatedVotes.splice(indexOf, 1);
                        return updatedVotes;
                    })
				}
			);
		} else {
			axios
				.patch('/topics/downvote', { topicId })
				.then((response) => {
                     setTopicVotes((prevVotes) => {
                        message.success(response.data.msg);
							const updatedVotes = [...prevVotes];
							const indexOf = updatedVotes.indexOf(
								currUser?.userId
							);
							updatedVotes.splice(indexOf, 1);
							return updatedVotes;
						});
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {});
		}
	};

	return {
		handleUpVoteTopic,
		handleDownVoteTopic,
	};
}

export default useDiscussion