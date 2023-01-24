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
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// this is a virtual method, being used for getting all the reviews associated with one specified product
CategorySchema.virtual('courses', {
	ref: 'Course',
	localField: '_id',
	foreignField: 'category.categoryId',
	justOne: false,
	// match: { rating: 5 }
});

module.exports = mongoose.model('Category', CategorySchema);
