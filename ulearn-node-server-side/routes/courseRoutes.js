const express = require('express');
const router = express.Router();
const {
	authorizePermissions,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse,
	deleteCourse,
	uploadImage,
} = require('../controllers/courseController');

const { getSingleCourseReviews } = require('../controllers/reviewController');

router
	.route('/')
	.get(getAllCourses)
	.post(authenticateUser, authorizePermissions('admin', 'instructor'), createCourse);

router
	.route('/uploadImage')
	.post(authenticateUser, authorizePermissions('admin', 'instructor'), uploadImage);

router
	.route('/:id')
	.get(getSingleCourse)
	.patch(authenticateUser, authorizePermissions('admin'), updateCourse)
	.delete(authenticateUser, authorizePermissions('admin'), deleteCourse);

router.route('/:id/reviews').get(getSingleCourseReviews);

module.exports = router;
