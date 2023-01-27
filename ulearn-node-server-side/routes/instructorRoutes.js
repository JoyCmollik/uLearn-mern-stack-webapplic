const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	getAllInstructors,
	getSingleInstructor,
	createInstructor,
	updateInstructor,
	deleteInstructor,
} = require('../controllers/instructorController');

router
	.route('/')
	.get(authenticateUser, getAllInstructors)
	.post(authenticateUser, createInstructor);

router
	.route('/:id')
	.get(authenticateUser, getSingleInstructor)
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
