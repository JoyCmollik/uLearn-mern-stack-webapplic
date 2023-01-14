const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema(
	{
		topicTitle: {
			type: String,
			required: [true, 'Please provide topic title'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		course: {
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
			required: true,
		},
		topicContent: {
			type: String,
			required: [true, 'Please provide topic content'],
		},
		voteCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Topic', TopicSchema);
