const Lesson = require('../models/Lesson');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createLesson = async (req, res) => {
	req.body.user = req.user.userId;

	const lesson = await Lesson.create(req.body);
	res.status(StatusCodes.CREATED).json({ lesson });
};

const getAllLessons = async (req, res) => {
	const lessons = await Lesson.find({});

	res.status(StatusCodes.OK).json({ lessons, count: lessons.length });
};

const getSingleLesson = async (req, res) => {
	const { id: lessonId } = req.params;

	const lesson = await Lesson.findOne({ _id: lessonId });

	if (!lesson) {
		throw new CustomError.NotFoundError(`No lesson with id: ${lessonId}`);
	}
	res.status(StatusCodes.OK).json({ lesson });
};

const updateLesson = async (req, res) => {
	const { id: lessonId } = req.params;

	const lesson = await Lesson.findOneAndUpdate({ _id: lessonId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!lesson) {
		throw new CustomError.NotFoundError(`No lesson with id: ${lessonId}`);
	}

	res.status(StatusCodes.OK).json({ lesson });
};

const deleteLesson = async (req, res) => {
	const { id: lessonId } = req.params;

	const lesson = await Lesson.findOne({ _id: lessonId });

	if (!lesson) {
		throw new CustomError.NotFoundError(`No lesson with id: ${lessonId}`);
	}

	await lesson.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createLesson,
	getAllLessons,
	getSingleLesson,
	updateLesson,
	deleteLesson,
};
