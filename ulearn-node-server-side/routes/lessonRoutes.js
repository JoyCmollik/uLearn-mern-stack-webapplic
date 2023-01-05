const express = require('express');
const router = express.Router();
const {
	authorizePermissions,
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
		authorizePermissions('admin', 'instructor'),
		createLesson
	);

router
	.route('/:id')
	.get(getSingleLesson)
	.patch(authenticateUser, authorizePermissions('admin', 'instructor'), updateLesson)
	.delete(authenticateUser, authorizePermissions('admin', 'instructor'), deleteLesson);

module.exports = router;
