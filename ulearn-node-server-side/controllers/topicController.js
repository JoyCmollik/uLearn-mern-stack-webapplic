const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { populate } = require('../models/Comment');

const createTopic = async (req, res) => {
	req.body.instructor = req.user.userId;

	const comment = await Comment.create(req.body);
	res.status(StatusCodes.CREATED).json({ comment: comment });
};

const getAllTopics = async (req, res) => {
	const comment = await Comment.find({});

	res.status(StatusCodes.OK).json({
		comments: comment,
		count: comment.length,
	});
};

const getSingleTopics = async (req, res) => {
	const { id: commentId } = req.params;

	const comment = await Comment.findOne({ _id: commentId })
		.populate({
			path: 'reviews',
			populate: { path: 'user', select: ['name', 'avatarURL'] },
		})
		.populate({
			path: 'sections',
			select: 'sectionTitle',
			populate: { path: 'lessons', select: 'lessonTitle' },
		});

	if (!comment) {
		throw new CustomError.NotFoundError(`No comment with id: ${commentId}`);
	}
	res.status(StatusCodes.OK).json({ comment: comment });
};

const getSingleCourseTopics = async (req, res) => {
	const { id: commentId } = req.params;

	const comment = await Comment.findOne({ _id: commentId })
		.select('courseTitle courseShortDesc level language')
		.populate({
			path: 'sections',
			populate: { path: 'lessons' },
		})
		.populate({ path: 'instructor', select: 'name avatarURL' });

	if (!comment) {
		throw new CustomError.NotFoundError(`No comment with id: ${commentId}`);
	}
	res.status(StatusCodes.OK).json({ comment: comment });
};

const updateTopic = async (req, res) => {
	const { id: commentId } = req.params;

	const comment = await Comment.findOneAndUpdate(
		{ _id: commentId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!comment) {
		throw new CustomError.NotFoundError(`No comment with id: ${commentId}`);
	}

	res.status(StatusCodes.OK).json({ comment: comment });
};

const deleteTopic = async (req, res) => {
	const { id: commentId } = req.params;

	const comment = await Comment.findOne({ _id: commentId });

	if (!comment) {
		throw new CustomError.NotFoundError(`No comment with id: ${commentId}`);
	}

	await comment.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createTopic,
	getAllTopics,
	getSingleTopics,
	getSingleCourseTopics,
	updateTopic,
	deleteTopic,
};
