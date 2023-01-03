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
		required: [true, 'please provide lesson subtitle'],
		minlength: 3,
		maxlength: 250,
	},
	lessonContent: {
		type: String,
		required: [true, 'please provide lesson content'],
	},
	lessonReadDuration: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Course', CourseSchema);
