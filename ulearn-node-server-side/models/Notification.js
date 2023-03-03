const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
	{
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: [
				'newVote',
				'newComment',
				'courseApproved',
				'adminMadeChanges',
			],
			required: true,
		},
		sender: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			name: String,
			avatarURL: String,
		},
		course: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course',
				required: true
			},
			courseTitle: String,
		},
		topic: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Topic',
			},
			topicTitle: String,
		},
		comment: {
			id: {
				type: String,
				ref: 'Comment',
			},
			commentBody: {
				type: String,
			},
		},
		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Notification', NotificationSchema);
