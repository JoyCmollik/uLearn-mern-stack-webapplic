const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createLesson,
	getAllLessons,
	getSingleLesson,
	updateLesson,
	deleteLesson,
} = require('../controllers/lessonController');

router
	.route('/')
	.get(getAllLessons)
	.post(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		createLesson
	);

router
	.route('/:id')
	.get(getSingleLesson)
	.patch(authenticateUser, authorizePermission('admin', 'instructor'), updateLesson)
	.delete(authenticateUser, authorizePermission('admin', 'instructor'), deleteLesson);

module.exports = router;
