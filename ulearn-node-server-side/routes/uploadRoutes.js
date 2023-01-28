const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
	uploadImage,
	uploadUserAvatar,
} = require('../controllers/uploadsController');

router.route('/upload').post(authenticateUser, uploadImage);
router.route('/uploadAvatar').post(authenticateUser, uploadUserAvatar);

module.exports = router;
