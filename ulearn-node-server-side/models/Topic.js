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
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// this is a virtual method, being used for getting all the reviews associated with one specified product
TopicSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'topic',
	justOne: false,
	// match: { rating: 5 }
});

/* 
#problem - while removing any product, should also delete associated reviews
#solution - can use remove hook here and access model Review to delete them
*/
TopicSchema.pre('remove', async function (next) {
	await this.model('Comment').deleteMany({ topic: this._id });

	// next();
});


module.exports = mongoose.model('Topic', TopicSchema);
