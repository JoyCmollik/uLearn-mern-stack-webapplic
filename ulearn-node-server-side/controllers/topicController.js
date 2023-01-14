const Topic = require('../models/Topic');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createTopic = async (req, res) => {
	req.body.instructor = req.user.userId;

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
			path: 'reviews',
			populate: { path: 'user', select: ['name', 'avatarURL'] },
		})
		.populate({
			path: 'sections',
			select: 'sectionTitle',
			populate: { path: 'lessons', select: 'lessonTitle' },
		});

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}
	res.status(StatusCodes.OK).json({ topic: topic });
};

const getSingleCourseTopics = async (req, res) => {
	const { id: topicId } = req.params;

	const topic = await Topic.findOne({ _id: topicId })
		.select('courseTitle courseShortDesc level language')
		.populate({
			path: 'sections',
			populate: { path: 'lessons' },
		})
		.populate({ path: 'instructor', select: 'name avatarURL' });

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}
	res.status(StatusCodes.OK).json({ topic: topic });
};

const updateTopic = async (req, res) => {
	const { id: topicId } = req.params;

	const topic = await Topic.findOneAndUpdate(
		{ _id: topicId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!topic) {
		throw new CustomError.NotFoundError(`No topic with id: ${topicId}`);
	}

	res.status(StatusCodes.OK).json({ topic: topic });
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
	deleteTopic,
};
