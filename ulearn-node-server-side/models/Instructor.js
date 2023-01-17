const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
	sectionTitle: {
		type: String,
		required: [true, 'please provide section title'],
		minlength: 10,
		maxlength: 50,
	},
	numOfLessons: {
		type: Number,
		default: 0,
	},
	lessons: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Lesson',
	},
});

module.exports = mongoose.model('Instructor', InstructorSchema);
