const express = require('express');
const router = express.Router();
const {
	authenticateUser,
	authorizePermission,
} = require('../middleware/authentication');

const {
	getAllEnrolls,
	getSingleEnroll,
	getCurrentUserEnrolls,
	createEnroll,
	updateEnroll,
} = require('../controllers/enrollController');

router
	.route('/')
	.post(authenticateUser, createEnroll)
	.get(authenticateUser, authorizePermission('admin'), getAllEnrolls);

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserEnrolls);

router
	.route('/:id')
	.get(authenticateUser, getSingleEnroll)
	.patch(authenticateUser, updateEnroll);

module.exports = router;
