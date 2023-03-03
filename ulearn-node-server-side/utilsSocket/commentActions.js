const Comment = require('../models/Comment');
const Topic = require('../models/Topic');
const {
	createNotification,
	removeNotification,
} = require('../controllers/notificationController');

const {

} = require('../controllers/notificationController');

const addComment = async (newComment, sender) => {
	try {
		// ---------- creating a new comment ----------
		const comment = new Comment(newComment);
		await comment.save();
		const populatedComment = await comment.populate(
			'user',
			'name avatarURL'
		);

		// ---------- finding parent topic of the comment ----------
		const topic = await Topic.findOne({
			_id: comment?.topic.toString(),
		}).select('topicTitle user course');

		// ---------- if someone else commented, sending a notification ----------
		if (sender?.id !== topic.user.toString()) {
			const { error, success, notification } = await createNotification({
				type: 'newComment',
				topic: {
					id: topic?._id.toString(),
					topicTitle: topic?.topicTitle,
				},
				sender,
				comment: {
					id: comment._id.toString(),
					commentBody: comment.commentBody.split(' ', 5).join(' '),
				},
				course: { id: topic.course.toString() },
				receiver: topic.user.toString(),
			});
			return {
				success,
				error,
				receiver: topic.user.toString(),
				comment: populatedComment,
				newNotification: notification,
			};
		}

		return {
			success: true,
			receiver: topic.user.toString(),
			comment: populatedComment,
		};
	} catch (error) {
        console.log(error, 'inside addComment');
		return { error: error?.errors || { message: 'server error'  } };
	}
};

const removeComment = async (commentId, userId, topicId, receiver) => {
	try {
		// ---------- deleting the comment ----------
		await Comment.findOneAndDelete({ _id: commentId });

		// ---------- removing the notification if it's not author's comment ----------
		if (receiver !== userId) {
			const { success, notificationId } = await removeNotification({
				type: 'newComment',
				senderId: userId,
				topicId,
				receiver,
				commentId,
			});
			return {
				success,
				notificationId,
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { error: error?.errors || { message: 'server error' } };
	}
};

module.exports = {
	addComment,
	removeComment,
};
