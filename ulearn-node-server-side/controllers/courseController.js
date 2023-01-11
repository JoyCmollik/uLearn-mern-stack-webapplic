const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createCourse = async (req, res) => {
	req.body.instructor = req.user.userId;

	const course = await Course.create(req.body);
	res.status(StatusCodes.CREATED).json({ course });
};

const getAllCourses = async (req, res) => {
	const courses = await Course.find({});

	res.status(StatusCodes.OK).json({ courses, count: courses.length });
};

const getSingleCourse = async (req, res) => {
	const { id: courseId } = req.params;

	const course = await Course.findOne({ _id: courseId }).populate({
		path: 'reviews', populate: { path: 'user', select: ['name', 'avatarURL'] }
	});

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}
	res.status(StatusCodes.OK).json({ course });
};

const getSingleCourseSections = async (req, res) => {
	const { id: courseId } = req.params;

	const course = await Course.findOne({ _id: courseId }).populate({
		path: 'sections',
		populate: { path: 'lessons' },
	});

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}
	res.status(StatusCodes.OK).json({ sections: course.sections });
};

const updateCourse = async (req, res) => {
	const { id: courseId } = req.params;

	const course = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}

	res.status(StatusCodes.OK).json({ course });
};

const deleteCourse = async (req, res) => {
	const { id: courseId } = req.params;

	const course = await Course.findOne({ _id: courseId });

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}

	await course.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

const uploadImage = async (req, res) => {
	if (!req.files) {
		throw new CustomError.BadRequestError('No file was received');
	}

	const courseImage = req.files.image;

	if (!courseImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('No file was received');
	}

	const maxSize = 1024 * 1024;

	if (courseImage.size > maxSize) {
		throw new CustomError.BadRequestError(
			'Please upload image smaller than 1MB or less. '
		);
	}

	const imagePath = path.join(
		__dirname,
		'../public/uploads/' + `${courseImage.name}`
	);

	await courseImage.mv(imagePath);

	res.status(StatusCodes.OK).json({ image: `/uploads/${courseImage.name}` });
};

module.exports = {
	createCourse,
	getAllCourses,
	getSingleCourse,
	getSingleCourseSections,
	updateCourse,
	deleteCourse,
	uploadImage,
};
