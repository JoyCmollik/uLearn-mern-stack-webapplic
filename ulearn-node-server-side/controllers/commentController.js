const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { populate } = require('../models/Comment');

const createComment = async (req, res) => {
	req.body.user = req.user.userId;

	const comment = await Comment.create(req.body);
	res.status(StatusCodes.CREATED).json({ comment: comment });
};

const getAllComments = async (req, res) => {
	const comment = await Comment.find({});

	res.status(StatusCodes.OK).json({
		comments: comment,
		count: comment.length,
	});
};

const getSingleComment = async (req, res) => {
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

const getSingleTopicComments = async (req, res) => {
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

const updateComment = async (req, res) => {
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

const deleteComment = async (req, res) => {
	const { id: commentId } = req.params;

	const comment = await Comment.findOne({ _id: commentId });

	if (!comment) {
		throw new CustomError.NotFoundError(`No comment with id: ${commentId}`);
	}

	await comment.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createComment,
	getAllComments,
	getSingleComment,
	getSingleTopicComments,
	updateComment,
	deleteComment,
};
