const Review = require('../models/Review');
const Course = require('../models/Course');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');
const { findOne } = require('../models/Review');

const createReview = async (req, res) => {
	const { course: courseId } = req.body;
	const isValidCourse = await Course.findOne({ _id: courseId });
	if (!isValidCourse) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}
	const alreadySubmitted = await Review.findOne({
		course: courseId,
		user: req.user.userId,
	});
	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			'Already Submitted Review for this course'
		);
	}
	req.body.user = req.user.userId;
	const review = await Review.create(req.body);
	res.status(StatusCodes.CREATED).send({ review });
};
const getAllReview = async (req, res) => {
	const reviews = await Review.find({})
		.populate({
			path: 'course',
			select: 'name company price',
		})
		.populate({
			path: 'user',
			select: 'name',
		});
	res.status(StatusCodes.OK).send({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No course with id: ${reviewId}`);
	}
	res.status(StatusCodes.OK).send({ review });
};
const updateReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const { rating, title, comment } = req.body;

	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No course with id: ${reviewId}`);
	}
	checkPermissions(req.user, review.user);
	review.rating = rating;
	review.title = title;
	review.comment = comment;
	await review.save();
	res.status(StatusCodes.OK).send({ review });
};
const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No course with id: ${reviewId}`);
	}
	checkPermissions(req.user, review.user);
	await review.remove();
	res.status(StatusCodes.OK).send({ msg: 'Success! review removed' });
};

const getSingleCourseReviews = async (req, res) => {
	const { id: courseId } = req.params;
	const reviews = await Review.find({ course: courseId });
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
	createReview,
	getAllReview,
	getSingleReview,
	updateReview,
	deleteReview,
	getSingleCourseReviews,
};
