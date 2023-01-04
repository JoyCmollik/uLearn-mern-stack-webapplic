const express = require('express');

const router = express.Router();
const {
	authenticateUser,
	authorizePermission,
} = require('../middleware/authentication');
const {
	createSection,
	getAllCourseSection,
	getSingleSection,
	updateSection,
	deleteSection,
} = require('../controllers/sectionController');

router
	.route('/')
	.post(
		[authenticateUser, authorizePermission('admin', 'instructior')],
		createSection
	)
	.get(getAllCourseSection);

router
	.route('/:id')
	.get(getSingleSection)
	.patch(
		[authenticateUser, authorizePermission('admin', 'instructor')],
		updateSection
	)
	.delete(
		[authenticateUser, authorizePermission('admin', 'instructor')],
		deleteSection
	);

module.exports = router;
