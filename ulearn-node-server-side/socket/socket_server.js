// socket functionality all imports
const {
	voteTopic,
	unVoteTopic,
	addComment,
	removeComment,
} = require('../utilsSocket/index');
const usersMap = new Map();

const socket_server = async (io) => {
	io.on('connection', async (socket) => {
		console.log(`[SOCKET] user ${socket.id} connected....`);
		usersMap.set(socket.handshake.auth.userId, socket.id);

		console.log('current users', usersMap);

		// ---------- users list ----------
		socket.on('join', async () => {
			usersMap.set(socket.handshake.auth.userId, socket.id);
		});

		// ---------- upvote topic ----------
		socket.on('voteTopic', async ({ topicId, sender }, callback) => {
			console.log(topicId, sender);
			// firstly vote on topic, and then create notification
			const { success, receiver, newNotification, error } =
				await voteTopic(topicId, sender);

			if (error) {
				callback(error);
			}

			if (success) {
				console.log('[SOCKET] inside upvote.');
				callback();

				// real time notification
				if (receiver !== sender?.id) {
					const receiverSocket = usersMap.get(receiver);
					if (receiverSocket) {
						// sending to one client if he is online
						io.to(receiverSocket).emit(
							'newNotificationReceived',
							newNotification
						);
					}
				}
			}
		});
		// ---------- downvote topic ----------
		socket.on('unVoteTopic', async ({ topicId, userId }, callback) => {
			const { success, notificationId, receiver, error } =
				await unVoteTopic(topicId, userId);

			if (success) {
				console.log('[SOCKET] inside downvote.');
				callback();

				// real time notification
				if (receiver !== userId) {
					const receiverSocket = usersMap.get(receiver);
					if (receiverSocket) {
						// sending to one client
						io.to(receiverSocket).emit('removeNewNotification', {
							notificationId,
						});
					}
				}
			}
		});

		// ---------- topic room join users ----------
		socket.on('joinTopicRoom', (topicId) => {
			console.log('[SOCKET] joining room....', socket.id);
			socket.join(topicId);
		});

		// ---------- topic room leave users ----------
		socket.on('leaveTopicRoom', (topicId) => {
			console.log('[SOCKET] leaving room....', socket.id);
			socket.leave(topicId);
		});

		// ---------- add new comment ----------
		socket.on('addComment', async ({ newComment, sender }, cb) => {
			const { success, newNotification, comment, receiver, error } =
				await addComment(newComment, sender);

			if (error) {
				cb({ error });
			}

			if (success) {
				cb({ success: true });
				// sending comment to frontend
				io.to(comment.topic.toString()).emit('newComment', { comment });

				// real time notification
				if (receiver !== sender?.id) {
					const receiverSocket = usersMap.get(receiver);
					if (receiverSocket) {
						// sending to one client if he is online
						io.to(receiverSocket).emit(
							'newNotificationReceived',
							newNotification
						);
					}
				}
			}
		});

		// ---------- remove existing comment ----------
		socket.on('removeComment', async ({ commentId, userId, topicId, receiver }, cb) => {
			console.log(commentId, userId, topicId, receiver);
			const { success, notificationId, error } =
				await removeComment(commentId, userId ,topicId, receiver);

			if (error) {
				cb({ error });
			}

			if (success) {
				cb({ success: true });
				io.to(topicId).emit('deletedComment', { commentId });

				// real time notification
				if (receiver !== userId) {
					const receiverSocket = usersMap.get(receiver);
					if (receiverSocket) {
						// sending to one client
						io.to(receiverSocket).emit('removeNewNotification', {
							notificationId,
						});
					}
				}
			}
		});
		// ---------- remove existing comment ----------
		socket.on('startedTyping', async ({ topicId }) => {
			socket.to(topicId).emit('setSomeoneTyping', { typing: true });
		});
		// ---------- remove existing comment ----------
		socket.on('stoppedTyping', async ({ topicId }) => {
			socket.to(topicId).emit('setSomeoneTyping', { typing: false });
		});

		// ---------- disconnect ----------
		socket.on('disconnect', () => {
			usersMap.delete(socket.handshake.auth.userId);
			console.log(`[SOCKET] user ${socket.id} disconnected.....`);
		});
	});
};

module.exports = socket_server;
