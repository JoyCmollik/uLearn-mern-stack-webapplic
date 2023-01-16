const Course = require('../models/Course');
const Topic = require('../models/Topic');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { getSingleTopicComments } = require('./commentController');

const createTopic = async (req, res) => {
	req.body.user = req.user.userId;

	const topic = await Topic.create(req.body);
	res.status(StatusCodes.CREATED).json({ topic: topic });
};

const getAllTopics = async (req, res) => {
	const topic = await Topic.find({});

	res.status(StatusCodes.OK).json({
		topics: topic,
		count: topic.length,
	});
};

const getSingleTopics = async (req, res) => {
	const { id: topicId } = req.params;

	const topic = await Topic.findOne({ _id: topicId })
		.populate({
			path: 'comments',
			populate: { path: 'user', select: 'name avatarURL' },
		})
		.populate('user', 'name avatarURL role createdAt');
	// options: { sort: 'name' }

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}
	res.status(StatusCodes.OK).json({ topic: topic });
};

const getSingleCourseTopics = async (req, res) => {
	const { id: courseId } = req.params;

	const topics = await Topic.find({ course: courseId })
		.populate('user', 'name avatarURL')
		.populate('comments', '_id')
		.sort('-_id');

	res.status(StatusCodes.OK).json({ topics: topics, count: topics.length });
};

const updateTopic = async (req, res) => {
	const { id: topicId } = req.params;

	const topic = await Topic.findOneAndUpdate({ _id: topicId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}

	res.status(StatusCodes.OK).json({ topic: topic });
};

const updateTopicUpvote = async (req, res) => {
	const { topicId } = req.body;
	const topic = await Topic.findOne({ _id: topicId });
	if (topic.votes.includes(req.user.userId)) {
		throw new CustomError.BadRequestError(
			`Already voted for ${topic.topicTitle}`
		);
	}

	if (topic.votes.length === 0) {
		topic.votes = [req.user.userId];
	} else {
		topic.votes = [...topic.votes, req.user.userId];
	}

	await topic.save();
	res.status(StatusCodes.OK).json({ msg: 'upvoted' });
};

const updateTopicDownvote = async (req, res) => {
	const { topicId } = req.body;
	const { userId } = req.user;
	const topic = await Topic.findOne({ _id: topicId });
	if (!topic.votes.includes(userId)) {
		throw new CustomError.BadRequestError(
			`you didn't vote for ${topic.topicTitle}`
		);
	}

	topic.votes = [...topic.votes.filter((voteId) => voteId != userId)];

	await topic.save();
	res.status(StatusCodes.OK).json({ msg : 'downvoted' });
};

const deleteTopic = async (req, res) => {
	const { id: topicId } = req.params;

	const topic = await Topic.findOne({ _id: topicId });

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}

	await topic.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createTopic,
	getAllTopics,
	getSingleTopics,
	getSingleCourseTopics,
	updateTopic,
	updateTopicUpvote,
	updateTopicDownvote,
	deleteTopic,
};
