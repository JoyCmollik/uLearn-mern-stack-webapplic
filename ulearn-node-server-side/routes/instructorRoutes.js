const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createInstructor,
	updateInstructor,
	deleteInstructor,
} = require('../controllers/instructorController');

router
	.route('/')

	.post(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		createInstructor
	);

router
	.route('/:id')

	.patch(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		updateInstructor
	)
	.delete(
		authenticateUser,
		authorizePermission('admin', 'instructor'),
		deleteInstructor
	);

module.exports = router;
