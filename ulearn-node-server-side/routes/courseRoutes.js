const express = require('express');
const router = express.Router();
const {
	authorizePermission,
	authenticateUser,
} = require('../middleware/authentication');

const {
	createCourse,
	getAllCourses,
	getSingleCourse,
	getSingleCourseSections,
	updateCourse,
	deleteCourse,
	uploadImage,
} = require('../controllers/courseController');

const { getSingleCourseReviews } = require('../controllers/reviewController');

router
	.route('/')
	.get(getAllCourses)
	.post(authenticateUser, authorizePermission('admin', 'instructor'), createCourse);

router
	.route('/uploadImage')
	.post(authenticateUser, authorizePermission('admin', 'instructor'), uploadImage);

router
	.route('/:id')
	.get(getSingleCourse)
	.patch(authenticateUser, authorizePermission('admin','instructor'), updateCourse)
	.delete(authenticateUser, authorizePermission('admin', 'instructor'), deleteCourse);

router.route('/:id/sections').get(getSingleCourseSections);
router.route('/:id/reviews').get(getSingleCourseReviews);

module.exports = router;
