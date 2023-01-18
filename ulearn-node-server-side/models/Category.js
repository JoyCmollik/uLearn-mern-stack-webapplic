const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		category: {
			type: String,
			trim: true,
			required: [true, 'Please provide the category'],
			unique: true,
			lowercase: true
		},
		categoryURL: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
