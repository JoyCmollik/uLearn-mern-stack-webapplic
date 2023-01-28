const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
	createTokenUser,
	attachCookiesToResponse,
	checkPermissions,
} = require('../utils');
const { registerUserByAdmin } = require('./authController');

const getAllUser = async (req, res) => {
	const users = await User.find(req.query).select(
		'-password -verificationToken'
	);

	res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id })
		.select('-password -verificationToken')
		.populate({
			path: 'instructor',
		});
	if (!User) {
		throw new CustomError.NotFoundError(
			`No user with id : ${req.params.id}`
		);
	}
	checkPermissions(req.user, user._id);
	res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};
//update user with user.save()
const UpdateUser = async (req, res) => {
	const { email, name, avatarURL } = req.body;
	let user = await User.findOne({ _id: req.user.userId });
	if (avatarURL) {
		user.avatarURL = avatarURL;
	}

	if (email && name) {
		user.email = email;
		user.name = name;
	}

	await user.save();

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({
		user: tokenUser,
	});
	return;
};

const UpdateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError('Please provide both values');
	}
	const user = await User.findOne({ _id: req.user.userId });
	const isPasswordCorrect = await user.comparePassword(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	user.password = newPassword;
	await user.save();
	res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
	getAllUser,
	getSingleUser,
	showCurrentUser,
	UpdateUser,
	UpdateUserPassword,
};
