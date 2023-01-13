const Enroll = require('../models/Enroll');
const Course = require('../models/Course');

const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { checkPermissions } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = 'someRandomValue';
	return { client_secret, amount };
};

const createEnroll = async (req, res) => {
	const { items: cartItems, tax, shippingFee } = req.body;
	const { paidAmount, courseId } = req.body;

	if (!courseId || !paidAmount) {
		throw new CustomError.BadRequestError(
			'Please provide courseId and paid amount'
		);
	}

	const dbCourse = await Course.findOne({ _id: courseId });
	if (!dbCourse) {
		throw new CustomError.BadRequestError(`No course with id ${courseId}`);
	}

    if (dbCourse.coursePrice !== paidAmount) {
		throw new CustomError.BadRequestError(
			'Paid amount is not correct!'
		);
	}

	// get client secret
	const paymentIntent = await fakeStripeAPI({
		amount: paidAmount,
		currency: 'usd',
	});

	const enroll = await Enroll.create({
		paidAmount: dbCourse.coursePrice,
		clientSecret: paymentIntent.client_secret,
		user: req.user.userId,
        course: dbCourse._id
	});

	res.status(StatusCodes.OK).json({
		enroll,
		clientSecret: enroll.client_secret,
	});
};

const getAllEnrolls = async (req, res) => {
	const enrolls = await Enroll.find({});

	res.status(StatusCodes.OK).json({ enrolls, count: enroll.length });
};

const getSingleEnroll = async (req, res) => {
	const { id: enrollId } = req.params;

	const enroll = await Enroll.findOne({ _id: enrollId });

	if (!enroll) {
		throw new CustomError.BadRequestError(`No enroll with id ${enrollId}`);
	}

	checkPermissions(req.user, enroll.user);

	res.status(StatusCodes.OK).json({ enroll });
};

const getCurrentUserEnrolls = async (req, res) => {
	const { userId } = req.user;

	const enrolls = await Enroll.find({ user: userId });

	res.status(StatusCodes.OK).json({ enrolls, count: enrolls.length });
};

const updateEnroll = async (req, res) => {
	const { id: enrollId } = req.params;
	const { paymentIntentId } = req.body;

	const enroll = await Enroll.findOne({ _id: enrollId });

	if (!enroll) {
		throw new CustomError.BadRequestError(`No enroll with id ${enrollId}`);
	}

	checkPermissions(req.user, enroll.user);

	enroll.paymentIntentId = paymentIntentId;
	enroll.status = 'paid';

	await enroll.save();

	res.status(StatusCodes.OK).json({ enroll });
};

module.exports = {
	getAllEnrolls,
	getSingleEnroll,
	getCurrentUserEnrolls,
	createEnroll,
	updateEnroll,
};
