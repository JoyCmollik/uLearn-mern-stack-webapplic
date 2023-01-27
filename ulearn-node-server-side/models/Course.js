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
		status: {
			type: String,
			enum: ['active', 'inactive', 'pending', 'rejected'],
			default: 'pending',
		},
		category: {
			type: {
				name: String,
				categoryId: {
					type: mongoose.Schema.ObjectId,
					ref: 'Category',
				},
			},
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
			type: String,
			default: '0',
			min: 0,
			max: 5,
		},
		numberOfReviews: {
			type: Number,
			default: 0,
		},
		ratingCount: {
			1: Number,
			2: Number,
			3: Number,
			4: Number,
			5: Number,
		},
		courseRequirements: {
			type: [String],
			required: [true, 'please provide course requirements'],
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
		currLearners: {
			type: [mongoose.Schema.ObjectId],
			ref: 'User',
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
#problem - while removing any product, should also delete associated reviews, sections, lessons, topics, comments
#solution - can use remove hook here and access model Review to delete them
*/
CourseSchema.pre('remove', async function (next) {
	await this.model('Review').deleteMany({ course: this._id });
	// await this.model('Section').deleteMany({ course: this._id });
	this.model('Section').find({ course: this._id }, function (err, sections) {
		if(sections.length) {
			for (let i = 0; i < sections.length; i++) {
				sections[i].remove();
			}
		}
	});
	// await this.model('Topic').deleteMany({ course: this._id });
	this.model('Topic').find({ course: this._id }, function (err, topics) {
		if(topics.length) {
			for (let i = 0; i < topics.length; i++) {
				topics[i].remove();
			}
		}
	});
});

module.exports = mongoose.model('Course', CourseSchema);
