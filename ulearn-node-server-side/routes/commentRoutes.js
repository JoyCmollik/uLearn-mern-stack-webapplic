const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createComment,
	getAllComments,
	getSingleComment,
	getSingleTopicComments,
	updateComment,
	deleteComment,
} = require('../controllers/commentController');

router.route('/').get(getAllComments).post(authenticateUser, createComment);

router
	.route('/:id')
	.get(getSingleComment)
	.patch(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		updateComment
	)
	.delete(authenticateUser, deleteComment);

router.route('/:id/sections').get(getSingleTopicComments);

module.exports = router;
