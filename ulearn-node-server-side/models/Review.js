const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please provide rating'],
		},
		comment: {
			type: String,
			required: [true, 'Please provide review text'],
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
	},
	{ timestamps: true }
);

ReviewSchema.index({ course: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (courseId) {
	const result = await this.aggregate([
		{
			$match: {
				course: courseId,
			},
		},
		{
			$group: {
				_id: null,
				averageRating: {
					$avg: '$rating',
				},
				numOfReviews: {
					$sum: 1,
				},
			},
		},
	]);
	console.log(result);
	try {
		await this.model('Course').findOneAndUpdate(
			{ _id: courseId },
			{
				averageRating: Math.ceil(result[0]?.averageRating || 0),
				numOfReviews: result[0]?.numOfReviews || 0,
			}
		);
	} catch (error) {
		console.log(error);
	}
};
ReviewSchema.post('save', async function () {
	await this.constructor.calculateAverageRating(this.course);
});
ReviewSchema.post('remove', async function () {
	await this.constructor.calculateAverageRating(this.course);
});
module.exports = mongoose.model('Review', ReviewSchema);
