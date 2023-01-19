const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, 'please provide userName'],
			minlength: 3,
			maxlength: 50,
		},
		occupation: {
			type: String,
			required: [true, 'please provide occupation'],
			minlength: 4,
			maxlength: 50,
		},

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		rate: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please provide rating'],
		},
		comment: {
			type: String,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
