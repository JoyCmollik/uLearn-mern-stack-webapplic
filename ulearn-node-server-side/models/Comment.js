const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
	{
		commentBody: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		topic: {
			type: mongoose.Schema.ObjectId,
			ref: 'Topic',
			required: true,
		},
		voteCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
