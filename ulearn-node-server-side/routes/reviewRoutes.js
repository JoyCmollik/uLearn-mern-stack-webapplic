const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
	createReview,
	getAllReview,
	getSingleReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviewController');

router.route('/').post(authenticateUser, createReview).get(getAllReview);

router
	.route('/:id')
	.get(getSingleReview)
	.patch(authenticateUser, updateReview)
	.delete(authenticateUser, deleteReview);

module.exports = router;
