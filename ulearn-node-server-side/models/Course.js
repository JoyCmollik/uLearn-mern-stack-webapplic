const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
	{
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
		courseDesc: {
			type: String,
			required: [true, 'please provide course description'],
		},
		category: {
			type: String,
			required: [true, 'please provide course category'],
		},
		level: {
			type: String,
			required: [true, 'please provide course category'],
		},
		language: {
			type: String,
			required: [true, 'please provide course category'],
		},
		instructor: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		enrolledStudents: {
			type: [mongoose.Schema.ObjectId],
			ref: 'User',
		},
		courseOutcomes: {
			type: [String],
			required: [true, 'please provide course outcomes'],
		},
		courseThumb: {
			type: String,
			required: [true, 'please provide course thumbnail'],
		},
		seoTags: {
			type: [String],
			required: [true, 'please provide course tags'],
		},
		courseMetaDesc: {
			type: String,
		},
		courseOverviewVidUrl: {
			type: String,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		numberOfReviews: {
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
		courseRequirements: {
			type: [String],
			required: [true, 'please provide course requirements'],
		},
		coursePrice: {
			type: Number,
			required: [true, 'please provide course price'],
		},
		isFree: {
			type: Boolean,
			required: [true, 'please provide course price'],
			default: false,
		},
		sections: {
			type: [mongoose.Schema.ObjectId],
			ref: 'Section',
			default: [],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// this is a virtual method, being used for getting all the reviews associated with one specified product
CourseSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'course',
	justOne: false,
	// match: { rating: 5 }
});

/* 
#problem - while removing any product, should also delete associated reviews
#solution - can use remove hook here and access model Review to delete them
*/
CourseSchema.pre('remove', async function (next) {
	await this.model('Review').deleteMany({ course: this._id });

	// next();
});

module.exports = mongoose.model('Course', CourseSchema);
