const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
	sectionTitle: {
		type: String,
		required: [true, 'please provide section title'],
		minlength: 20,
		maxlength: 50,
	},
	numOfLessons: {
		type: Number,
		required: [true, 'please provide number of lessons'],
		min: 20,
		max: 50,
	},
	lessons: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Lesson',
		required: true,
	},
});

module.exports = mongoose.model('Section', SectionSchema);
