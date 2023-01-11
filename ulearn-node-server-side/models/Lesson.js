const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	lessonTitle: {
		type: String,
		required: [true, 'please provide lesson title'],
		minlength: 3,
		maxlength: 100,
	},
	lessonSubtitle: {
		type: String,
		minlength: 3,
		maxlength: 250,
	},
	lessonContent: {
		type: String,
	},
	lessonReadDuration: {
		type: Number,
		default: 0,
	},
	language: {
		type: String,
	}
});

module.exports = mongoose.model('Lesson', LessonSchema);
