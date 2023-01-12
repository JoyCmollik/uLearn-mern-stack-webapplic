const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermission } = require('../middleware/authentication');
const {
	createCategory,
    getAllCategories,
	getSingleCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categoryController');

router
	.route('/')
	.post(authenticateUser, authorizePermission('admin'), createCategory)
	.get(getAllCategories);

router
	.route('/:id')
	.get(getSingleCategory)
	.patch(authenticateUser, updateCategory)
	.delete(authenticateUser, deleteCategory);

module.exports = router;
