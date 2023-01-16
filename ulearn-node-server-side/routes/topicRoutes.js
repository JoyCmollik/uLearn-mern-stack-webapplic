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
	updateTopicUpvote,
	updateTopicDownvote,
	deleteTopic,
} = require('../controllers/topicController');

router.route('/').get(getAllTopics).post(authenticateUser, createTopic);
router.route('/upvote').patch(authenticateUser, updateTopicUpvote);
router.route('/downvote').patch(authenticateUser, updateTopicDownvote);
router.route('/course/:id').get(getSingleCourseTopics);

router
	.route('/:id')
	.get(getSingleTopics)
	.patch(authenticateUser, updateTopic)
	.delete(authenticateUser, deleteTopic);

module.exports = router;
