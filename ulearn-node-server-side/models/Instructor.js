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
		status: {
			type: String,
			enum: ['pending', 'approved'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

InstructorSchema.post('save', async function () {
	try {
		const user = await this.model('User').findOneAndUpdate(
			{ _id: this.user },
			{
				role: 'instructor',
			}
		);
		console.log(user, 'joyc');
	} catch (error) {
		console.log(error);
	}
});

module.exports = mongoose.model('Instructor', InstructorSchema);
