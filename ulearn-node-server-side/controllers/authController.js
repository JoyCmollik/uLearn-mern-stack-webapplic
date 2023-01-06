const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
	attachCookiesToResponse,
	createTokenUser,
	sendVerificationEmail,
} = require('../utils/');
const crypto = require('crypto');

const register = async (req, res) => {
	let { email, name, password, role } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email Already Exists');
	}

	//first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0; //0 means no user
	role = isFirstAccount ? 'admin' : role;

	if (role != 'user' && role != 'instructor') {
		throw new CustomError.UnauthorizedError(
			'You are unauthorized to perform this task!'
		);
	}
	const verificationToken = crypto.randomBytes(40).toString('hex');
	const user = await User.create({
		name,
		email,
		password,
		role,
		verificationToken,
	});
	const origin = 'http://localhost:3000';
	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin,
	});
	/* const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser }); */
	//send verification token while testing in postman !!
	res.status(StatusCodes.CREATED).json({
		msg: 'Success! please check your email to verify account',
	});
};

const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body;
	console.log(verificationToken, email);
	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError.UnauthenticatedError('Verification Failed');
	}

	if (user.verificationToken !== verificationToken) {
		throw new CustomError.UnauthenticatedError('Verification Failed');
	}
	(user.isVerified = true), (user.verified = Date.now());
	user.verificationToken = '';
	await user.save();
	res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new CustomError.BadRequestError(
			'Please provide email and password'
		);
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new CustomError.UnauthenticatedError('Invalid credentials');
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	if (!user.isVerified) {
		throw new CustomError.UnauthenticatedError('Please Verify Your Email');
	}
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
	register,
	login,
	logout,
	verifyEmail,
};
