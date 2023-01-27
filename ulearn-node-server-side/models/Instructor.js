const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema(
	{
		degreeTitle: {
			type: String,
			required: [true, 'please provide degree title'],
			minlength: 10,
			maxlength: 50,
		},
		institutionName: {
			type: String,
			required: [true, 'please provide institution name'],
			minlength: 10,
			maxlength: 50,
		},
		approxPassingYear: {
			type: Number,
			required: [true, 'please provide approximate passing year'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		skillSets: {
			type: [String],
			required: [true, 'please provide skill sets'],
		},
		rating: {
			type: Number,

			default: 0,
		},
		aboutYou: {
			type: String,
			required: [true, 'Please provide about you.'],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
// this is a virtual method, being used for getting all the reviews associated with one specified product
InstructorSchema.virtual('courses', {
	ref: 'Course',
	localField: 'user',
	foreignField: 'instructor',
	justOne: false,
	// match: { rating: 5 }
});


InstructorSchema.post('save', async function () {
	try {
		await this.model('User').findOneAndUpdate(
			{ _id: this.user },
			{
				role: 'instructor',
			}
		);
	} catch (error) {
		console.log(error);
	}
});

module.exports = mongoose.model('Instructor', InstructorSchema);
