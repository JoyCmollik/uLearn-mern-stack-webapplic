const express = require('express');
const router = express.Router();
const {
	authenticateUser,
	authorizePermission,
} = require('../middleware/authentication');
const {
	getAllUser,
	getSingleUser,
	showCurrentUser,
	UpdateUser,
	updateUserVerificationStatus,
	UpdateUserPassword,
} = require('../controllers/userController');

router
	.route('/')
	.get(authenticateUser, authorizePermission('admin'), getAllUser);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, UpdateUser);
router.route('/updateUserPassword').patch(authenticateUser, UpdateUserPassword);
router
	.route('/updateUserStatus/:userId')
	.get(
		authenticateUser,
		authorizePermission('admin'),
		updateUserVerificationStatus
	);
router.route('/:id').get(authenticateUser, getSingleUser);
module.exports = router;
