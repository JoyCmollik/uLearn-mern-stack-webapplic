const Category = require('../models/Category');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createCategory = async (req, res) => {
	req.body.user = req.user.userId;
	const category = await Category.create(req.body);
	res.status(StatusCodes.CREATED).send({ category });
};

const getAllCategories = async (req, res) => {
	const categories = await Category.find({}).populate('user', 'name avatarURL').sort('-_id');
	
	res.status(StatusCodes.OK).send({ categories, count: categories.length });
};

const getSingleCategory = async (req, res) => {
	const { id: categoryId } = req.params;
	const category = await Category.findOne({ _id: categoryId });
	if (!category) {
		throw new CustomError.NotFoundError(`No category with Id: ${categoryId}`);
	}
	res.status(StatusCodes.OK).send({ category });
};

const updateCategory = async (req, res) => {
	const { id: categoryId } = req.params;
	const category = await Category.findOneAndUpdate(
		{ _id: categoryId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!category) {
		throw new CustomError.NotFoundError(`No category with Id: ${categoryId}`);
	}
	res.status(StatusCodes.OK).send({ category });
};

const deleteCategory = async (req, res) => {
	const { id: categoryId } = req.params;
	const category = await Category.findOne({ _id: categoryId });
	if (!category) {
		throw new CustomError.NotFoundError(`No category with Id: ${categoryId}`);
	}
	await category.remove();
	res.status(StatusCodes.OK).send({ msg: 'success! category removed.' });
};

module.exports = {
	createCategory,
    getAllCategories,
	getSingleCategory,
	updateCategory,
	deleteCategory,
};
