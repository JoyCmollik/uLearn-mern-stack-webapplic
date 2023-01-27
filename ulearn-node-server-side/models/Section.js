const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
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
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});

// will run before saving the document -> update lesson List in the Section Schema
SectionSchema.pre('save', async function (next) {
	try {
		await this.model('Course').findOneAndUpdate(
			{ _id: this.course },
			{
				$push: { sections: this._id },
			}
		);
		next();
	} catch (error) {
		console.log(error);
	}
});

// will run before removing the document -> update lesson List in the Section Schema
// - to remove a section - i) pull this sectionId from course, ii) delete all lessons associated
SectionSchema.pre('remove', async function (next) {
	try {
		await this.model('Course').findOneAndUpdate(
			{ _id: this.course },
			{
				$pull: { sections: this._id },
			}
		);

		await this.model('Lesson').deleteMany({ _id: { $in: this.lessons } });
		next();
	} catch (error) {
		console.log(error);
	}
});

module.exports = mongoose.model('Section', SectionSchema);
