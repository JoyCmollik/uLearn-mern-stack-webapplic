const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { populate, find } = require('../models/Course');

const createCourse = async (req, res) => {
	req.body.instructor = req.user.userId;

	const course = await Course.create(req.body);
	const { category } = req.body;

	res.status(StatusCodes.CREATED).json({ course });
};

const getAllCourses = async (req, res) => {
	let filters = { ...req.query };
	const queries = {};

	// sort, page. limit -> exclude
	const excludeFields = ['sort', 'page', 'limit', 'category', 'level'];
	excludeFields.forEach((field) => delete filters[field]); // to delete desired fields

	// sorting queries
	if (req.query.sort) {
		// price, quantity -> 'price quantity'
		const sortBy = req.query.sort.split(',').join(' ');
		queries.sortBy = sortBy;
	}

	// selecting queries
	if (req.query.fields) {
		const fields = req.query.fields.split(',').join(' ');
		queries.fields = fields;
	}

	// pagination
	if (req.query.page) {
		const { page = 1, limit = 2 } = req.query;
		const skip = (Number(page) - 1) * Number(limit); // page 5 --> 5 - 1 * 10 = skip first 4 page data
		queries.skip = skip;
		queries.limit = Number(limit);
	}

	// advanced filters - url is price[gt]=50
	let filtersString = JSON.stringify(filters);
	filtersString = filtersString.replace(
		/\b(gt|gte|lt|lte|regex)\b/g,
		(match) => `$${match}`
	);
	filters = JSON.parse(filtersString);

	// filters for category property
	if (req.query.category) {
		filters['category.categoryId'] = req.query.category.split(',');
	}

	// levels
	if (req.query.level) {
		filters.level = req.query.level.split(',');
	}

	// search
	if (req.query.search) {
		filters.courseTitle = new RegExp(req.query.search, 'i');
	}
 
	// final procedure
	const courses = await Course.find(filters)
		.skip(queries.skip)
		.limit(queries.limit)
		.select(queries.fields)
		.sort(queries.sortBy)
		.populate('instructor', 'name avatarURL');
	const totalCourses = await Course.countDocuments(filters);

	const pageCount = Math.ceil(totalCourses / queries.limit);
	res.status(StatusCodes.OK).json({
		courses,
		count: courses.length,
		total: totalCourses,
		pageCount,
	});
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

const getCourseStats = async ( req, res ) => {
	const totalCourses = await Course.countDocuments({});
	const totalLesson = await Lesson.countDocuments({});
	const totalLearner = await Lesson.countDocuments({ role: 'user' });
	const totalContentWriters = await Lesson.countDocuments({ role: 'instructor' });
	const pendingCourses = await Course.countDocuments({ status: 'pending' });
	const activeCourses = await Course.countDocuments({ status: 'active' });

	res.status(StatusCodes.OK).json({
		totalCourses,
		totalLesson,
		totalLearner,
		totalContentWriters,
		pendingCourses,
		activeCourses,
	});
}

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
	getCourseStats,
	updateCourse,
	updateSingleUserCourses,
	deleteCourse,
	uploadImage,
};
