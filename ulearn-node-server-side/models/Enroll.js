const mongoose = require('mongoose');

const EnrollSchema = new mongoose.Schema({
	clientSecret: {
		type: String,
        required: true
	},
    paymentIntentId: {
        type: String
    },
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
        required : true
	},
	course: {
		type: mongoose.Schema.ObjectId,
		ref: 'Course',
        required: true
	},
}, {timestamps: true});

module.exports = mongoose.model('Enroll', EnrollSchema);
