const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	courseTitle: {
		type: String,
		required: [true, 'please provide course title'],
		minlength: 3,
		maxlength: 100,
	},
	courseShortDesc: {
		type: String,
		required: [true, 'please provide course description'],
		minlength: 3,
		maxlength: 250,
	},
	aboutCourse: {
		type: String,
		required: [true, 'please provide course title'],
		minlength: 3,
		maxlength: 100,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'please provide valid email',
		},
	},
	password: {
		type: String,
		required: [true, 'please provide email'],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
});

module.exports = mongoose.model('Course', CourseSchema);
