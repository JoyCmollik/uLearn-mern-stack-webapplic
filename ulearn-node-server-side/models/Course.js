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
	instructor: {
		type: mongoose.Types.ObjectId(),
		ref: User,
		required: true,
	},
	enrolledStudents: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
	courseOutcomes: {
		type: [String],
		required: [true, 'please provide course outcomes'],
	},
	reviews: {
		type: [mongoose.Types.ObjectId],
		ref: 'Review',
	},
	averageRating: {
		type: Number,
		default: 0, 
		min: 0,
		max: 5
	},
	numberOfReviews: {
		type: {
			numOf5: {
				type: Number,
				default: 0,
			},
			numOf4: {
				type: Number,
				default: 0,
			},
			numOf3: {
				type: Number,
				default: 0,
			},
			numOf2: {
				type: Number,
				default: 0,
			},
			numOf1: {
				type: Number,
				default: 0,
			},
		},
	},
	requirements: {
		type: [String],
		required: [true, 'please provide course requirements']
	},
	sections: {
		type: [mongoose.Types.ObjectId],
		ref: 'Section'
	}
});

module.exports = mongoose.model('Course', CourseSchema);
