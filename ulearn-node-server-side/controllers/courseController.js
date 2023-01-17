const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { populate } = require('../models/Course');

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

	const course = await Course.findOne({ _id: courseId })
		.populate({
			path: 'reviews',
			populate: { path: 'user', select: ['name', 'avatarURL'] },
		})
		.populate({
			path: 'sections',
			select: 'sectionTitle',
			populate: { path: 'lessons', select: 'lessonTitle' },
		});

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}
	res.status(StatusCodes.OK).json({ course });
};

const getSingleUserCourses = async (req, res) => {
	const { userId } = req.user;

	const courses = await Course.find({
		currLearners: { $in: [userId] },
	}).select('courseTitle courseShortDesc courseThumb level language');

	res.status(StatusCodes.OK).json({ courses });
};

const getSingleCourseSections = async (req, res) => {
	const { id: courseId } = req.params;

	const course = await Course.findOne({ _id: courseId })
		.select('courseTitle courseShortDesc level language')
		.populate({
			path: 'sections',
			populate: { path: 'lessons' },
		})
		.populate({ path: 'instructor', select: 'name avatarURL' });

	if (!course) {
		throw new CustomError.NotFoundError(`No course with id: ${courseId}`);
	}
	res.status(StatusCodes.OK).json({ course });
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

const updateSingleUserCourses = async (req, res) => {
	const { courseId, isAdd } = req.body;
	const userId = req.user.userId;

	const course = await Course.findOne({ _id: courseId });
	if (isAdd && !course.currLearners.includes(userId)) {
		course.currLearners = [...course.currLearners, userId];
	} else if (course.currLearners.includes(userId)) {
		course.currLearners = course.currLearners.filter(
			(currId) => currId + '' !== userId + ''
		);
	} else {
		throw new CustomError.BadRequestError('Not possible to process.');
	}

	await course.save();
	res.status(StatusCodes.OK).json({ currLearners: course.currLearners });
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
	getSingleUserCourses,
	updateCourse,
	updateSingleUserCourses,
	deleteCourse,
	uploadImage,
};
