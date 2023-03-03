const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	getUserNotifications,
	setUserNotificationsToRead,
} = require('../controllers/notificationController');

router.route('/').get(authenticateUser, getUserNotifications);
router.route('/read').patch(authenticateUser, setUserNotificationsToRead);

module.exports = router;
