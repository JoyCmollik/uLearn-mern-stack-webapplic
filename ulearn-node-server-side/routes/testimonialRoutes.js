const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
	createTestimonial,
	getAllTestimonial,
	updateTestimonial,
	deleteTestimonial,
	getSingleTestimonial,
} = require('../controllers/testimonialController');

router
	.route('/')
	.post(authenticateUser, createTestimonial)
	.get(getAllTestimonial);

router
	.route('/:id')
	.get(getSingleTestimonial)
	.patch(authenticateUser, updateTestimonial)
	.delete(authenticateUser, deleteTestimonial);

module.exports = router;
