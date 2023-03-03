const Topic = require('../models/Topic');

const {
	createNotification,
	removeNotification,
} = require('../controllers/notificationController');

const voteTopic = async (topicId, sender) => {
	try {
		const topic = await Topic.findOne({ _id: topicId });
		if (topic.votes.includes(sender.id)) {
			return { error: 'Already voted' };
		}

		await topic.votes.unshift(sender.id);

		await topic.save();

		// send user a notification
		if (sender?.id !== topic.user.toString()) {
			const { error, success, notification } = await createNotification({
				type: 'newVote',
				topic: {
					id: topic._id.toString(),
					topicTitle: topic.topicTitle,
				},
				sender,
				course: { id: topic.course.toString() },
				receiver: topic.user.toString(),
			});
			return {
				success,
				error,
				receiver: topic.user.toString(),
				newNotification: notification,
			};
		}

		// if user liked his own post, no notification sent
		return {success: true}

	} catch (error) {
        return { error: 'server error' }
    }
};

const unVoteTopic = async (topicId, userId) => {
	try {
        const topic = await Topic.findOne({ _id: topicId });
		if (!topic.votes.includes(userId)) {
			return { error: 'Not voted' };
		}

		topic.votes = [...topic.votes.filter((voteId) => voteId != userId)];

		await topic.save();

		// removing notification
		if (topic.user.toString() !== userId) {
			const {success, notificationId} = await removeNotification({
				type: 'newVote',
				senderId: userId,
				topicId: topic._id.toString(),
				receiver: topic.user.toString(),
			});
			return {
				success,
				notificationId,
				receiver: topic.user.toString(),
			};
		}

		return {
			success: true,
			receiver: topic.user.toString(),
		};
    } catch (error) {
        return { error: 'server error' }
    }
};

module.exports = {
	voteTopic,
	unVoteTopic,
};
