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
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section',
		required: true,
	},
	language: {
		type: String,
	},
});

// will run before saving the document -> update lesson List in the Section Schema
LessonSchema.pre('save', async function (next) {
	try {
		await this.model('Section').findOneAndUpdate(
			{ _id: this.section },
			{
				$push: { lessons: this._id },
			}
		);
		next();
	} catch (error) {
		console.log(error);
	}
});

// will run before removing the document -> update lesson List in the Section Schema
LessonSchema.pre('remove', async function (next) {
	try {
		await this.model('Section').findOneAndUpdate(
			{ _id: this.section },
			{
				$pull: { lessons: this._id },
			}
		);
		next();
	} catch (error) {
		console.log(error);
	}
});

module.exports = mongoose.model('Lesson', LessonSchema);
