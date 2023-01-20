const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: [true, 'Please provide the category'],
			lowercase: true,
		},
		categoryURL: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		courses: {
			type: [mongoose.Schema.ObjectId],
			ref: 'Course',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
