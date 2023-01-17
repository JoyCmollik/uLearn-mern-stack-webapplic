const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermission } = require('../middleware/authentication');
const {
	register,
	registerUserByAdmin,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
} = require('../controllers/authController');

router.post('/register', register);
router.post(
	'/admin/register',
	authenticateUser,
	authorizePermission('admin'),
	registerUserByAdmin
);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
