const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'please provide name'],
			minlength: 3,
			maxlength: 50,
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
		about: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'instructor', 'user'],
			default: 'user',
		},
		gender: {
			type: String,
			enum: ['female', 'male', 'others'],
			required: [true, 'please provide gender of the user'],
		},
		avatarURL: {
			type: String,
			default: function () {
				const random = Math.floor(Math.random() * 3);
				if (this.gender === 'female') {
					const femaleAvatars = [
						'https://i.ibb.co/LPbvPDW/3d-rendering-zoom-call-avatar.jpg',
						'https://i.ibb.co/d09ZskT/cute-business-woman-idea-thinking-present-pink-background-3d-rendering.jpg',
						'https://i.ibb.co/JrDPyTj/3d-rendering-zoom-call-avatar-2.jpg',
					];
					return femaleAvatars[random];
				} else if (this.gender === 'male') {
					const maleAvatars = [
						'https://i.ibb.co/gyh97hR/3d-rendering-zoom-call-avatar-1.jpg',
						'https://i.ibb.co/0nDYgtn/3d-rendering-zoom-call-avatar-4.jpg',
						'https://i.ibb.co/M72P1xD/3d-rendering-zoom-call-avatar-3.jpg',
					];
					return maleAvatars[random];
				}
				return 'https://i.ibb.co/vkv7fZH/3d-astronaut-flat-circle-line-art-design-illustration.jpg';
			},
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		passwordToken: {
			type: String,
		},
		passwordTokenExpirationDate: {
			type: Date,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
UserSchema.virtual('instructor', {
	ref: 'Instructor',
	localField: '_id',
	foreignField: 'user',
	get: function (instructor) {
		return instructor ? instructor : false;
	},
});

UserSchema.pre('save', async function () {
	//console.log(this.modifiedPaths());
	//console.log(this.isModified('name'));
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
