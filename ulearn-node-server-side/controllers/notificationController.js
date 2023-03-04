const Notification = require('../models/Notification');
const { StatusCodes } = require('http-status-codes');

// ---------- API Calls ----------
const getUserNotifications = async (req, res) => {
	// TODO: add limit query later
	const notifications = await Notification.find({
		receiver: req.user.userId,
	})
		.sort({ createdAt: -1 })
		.limit(40);

	res.status(StatusCodes.OK).send({
		notifications,
		count: notifications.length,
	});
};

// - will change status of notifications to read
const setUserNotificationsToRead = async (req, res) => {
	const notifications = await Notification.updateMany(
		{ receiver: req.user.userId, isRead: false },
		{ isRead: true }
	);

	res.status(StatusCodes.OK).send({ notifications });
};

// ---------- Local API Calls ----------

// - function to create all types of notification
const createNotification = async (newNotification) => {
	try {
		const notification = await Notification.create(newNotification);
		return { success: true, notification };
	} catch (error) {
		return { error };
	}
};

// - function to delete all types of notification
const removeNotification = async ({
	type,
	courseId,
	senderId,
	topicId,
	commentId,
	receiver,
}) => {
	let query = {};

	// TODO: work on last two types
	switch (type) {
		case 'newVote':
			query = {
				type,
				'topic.id': topicId,
				'sender.id': senderId,
				receiver,
			};
			break;
		case 'newComment':
			query = {
				type,
				'topic.id': topicId,
				'sender.id': senderId,
				receiver,
				'comment.id': commentId,
			};
			break;
		case 'courseApproved':
			query = {
				type,
				'topic.id': topicId,
				'sender.id': senderId,
			};
			break;
		case 'adminMadeChanges':
			query = {
				type,
				'topic.id': topicId,
				'sender.id': senderId,
			};
			break;

		default:
			query = {};
			break;
	}

	try {
		const notification = await Notification.findOne(query);
		if (notification) {
			let notificationId = notification?._id.toString();
			await notification.remove();
			return { success: true, notificationId };
		}
		return { success: true };
	} catch (error) {
		console.log('inside removeNotification', error);
		return { error };
	}
};

module.exports = {
	createNotification,
	removeNotification,
	getUserNotifications,
	setUserNotificationsToRead,
};
