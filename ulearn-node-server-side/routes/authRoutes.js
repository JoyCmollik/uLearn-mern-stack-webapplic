const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
	register,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);

module.exports = router;
