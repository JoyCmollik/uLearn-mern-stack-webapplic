const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createTopic,
	getAllTopics,
	getSingleTopics,
	getSingleCourseTopics,
	updateTopic,
	deleteTopic,
} = require('../controllers/topicController');

router
	.route('/')
	.get(getAllTopics)
	.post(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		createTopic
	);

router
	.route('/:id')
	.get(getSingleTopics)
	.patch(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		updateTopic
	)
	.delete(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		deleteTopic
	);

router.route('/:id/sections').get(getSingleCourseTopics);

module.exports = router;
