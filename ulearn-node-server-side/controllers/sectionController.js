const Section = require('../models/Section');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const createSection = async (req, res) => {
	req.body.user = req.user.userId;
	const section = await Section.create(req.body);
	res.status(StatusCodes.CREATED).send({ section });
};
const getAllCourseSection = async (req, res) => {
	const section = await Section.find({});
	res.status(StatusCodes.OK).send({ section, count: section.length });
};
const getSingleSection = async (req, res) => {
	const { id: sectionId } = req.params;
	const section = await Section.findOne({ _id: sectionId });
	if (!section) {
		throw new CustomError.NotFoundError(`No section with Id: ${sectionId}`);
	}
	res.status(StatusCodes.OK).send({ section });
};
const updateSection = async (req, res) => {
	const { id: sectionId } = req.params;
	const section = await Section.findOneAndUpdate(
		{ _id: sectionId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!section) {
		throw new CustomError.NotFoundError(`No section with Id: ${sectionId}`);
	}
	res.status(StatusCodes.OK).send({ section });
};
const deleteSection = async (req, res) => {
	const { id: sectionId } = req.params;
	const section = await Section.findOne({ _id: sectionId });
	if (!section) {
		throw new CustomError.NotFoundError(`No section with Id: ${sectionId}`);
	}
	await section.remove();
	res.status(StatusCodes.OK).send({ msg: 'success! section removed.' });
};

module.exports = {
	createSection,
	getAllCourseSection,
	getSingleSection,
	updateSection,
	deleteSection,
};
