const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
	attachCookiesToResponse,
	createTokenUser,
	sendVerificationEmail,
	sendResetPasswordEmail,
	createHash,
} = require('../utils/');
const crypto = require('crypto');

const register = async (req, res) => {
	let { email, name, password, role, gender } = req.body;
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email Already Exists');
	}

	//first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0; //0 means no user
	role = isFirstAccount ? 'admin' : role;

	if (
		!isFirstAccount &&
		role.toString() !== 'user' &&
		role.toString() !== 'instructor'
	) {
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
		gender,
		verificationToken,
	});
	const origin = process.env.ORIGIN;
	console.log(origin, 'yelling......');

	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin,
	});

	/* const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser }); */

	res.status(StatusCodes.CREATED).json({
		msg: 'Success! please check your email to verify account',
	});
};

const registerUserByAdmin = async (req, res) => {
	let { email, name, password, role, gender, instructor } = req.body;
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email Already Exists');
	}

	const verificationToken = crypto.randomBytes(40).toString('hex');
	const user = await User.create({
		name,
		email,
		password,
		role,
		gender,
		isVerified: true,
		verificationToken,
	});

	if(role==='instructor' && instructor) {
		const newInstructor = await Instructor.create({...instructor, user: user?._id});
	}

	/* const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser }); */

	res.status(StatusCodes.CREATED).json({
		msg: 'Success! user is created'
	});
};

const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body;
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

	//create refresh token
	let refreshToken = '';
	// check for existing token
	const existingToken = await Token.findOne({ user: user._id });

	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new CustomError.UnauthenticatedError('Invalid Credentials');
		}
		refreshToken = existingToken.refreshToken;
		attachCookiesToResponse({ res, user: tokenUser, refreshToken });
		res.status(StatusCodes.OK).json({ user: tokenUser });
		return;
	}
	refreshToken = crypto.randomBytes(40).toString('hex');
	const userAgent = req.headers['user-agent'];
	const ip = req.ip;
	const userToken = { refreshToken, ip, userAgent, user: user._id };

	await Token.create(userToken);

	attachCookiesToResponse({ res, user: tokenUser, refreshToken });

	res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
	await Token.findOneAndDelete({ user: req.user.userId });

	res.cookie('accessToken', 'logout', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : null,
		expires: new Date(Date.now()),
	});
	res.cookie('refreshToken', 'logout', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : null,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw new CustomError.BadRequestError('Please provide valid email');
	}

	const user = await User.findOne({ email });

	if (user) {
		const passwordToken = crypto.randomBytes(70).toString('hex');
		// send email
		const origin = process.env.ORIGIN;

		await sendResetPasswordEmail({
			name: user.name,
			email: user.email,
			token: passwordToken,
			origin,
		});

		const tenMinutes = 1000 * 60 * 10;
		const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

		user.passwordToken = createHash(passwordToken);

		user.passwordTokenExpirationDate = passwordTokenExpirationDate;
		await user.save();
	}

	res.status(StatusCodes.OK).json({
		msg: 'Please check your email for reset password link',
	});
};
const resetPassword = async (req, res) => {
	const { token, email, password } = req.body;
	if (!token || !email || !password) {
		throw new CustomError.BadRequestError('Please provide all values');
	}
	const user = await User.findOne({ email });

	if (user) {
		const currentDate = new Date();

		if (
			user.passwordToken === createHash(token) &&
			user.passwordTokenExpirationDate > currentDate
		) {
			user.password = password;
			user.passwordToken = null;
			user.passwordTokenExpirationDate = null;
			await user.save();
		}
	}

	res.send('reset password');
};

module.exports = {
	register,
	registerUserByAdmin,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
};
