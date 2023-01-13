const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
	createTokenUser,
	attachCookiesToResponse,
	checkPermissions,
} = require('../utils');

const getAllUser = async (req, res) => {
	// const users = await User.find({ role: 'user' }).select('-password');
	const users = await User.find({}).select('-password');
	res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select('-password');
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
	const { email, name } = req.body;
	if (!email || !name) {
		throw new CustomError.BadRequestError('Please provide all values');
	}
	const user = await User.findOne({ _id: req.user.userId });
	user.email = email;
	user.name = name;

	await user.save();
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
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
