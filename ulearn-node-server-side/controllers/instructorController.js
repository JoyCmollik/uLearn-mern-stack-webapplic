const Instructor = require('../models/Instructor');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createInstructor = async (req, res) => {
	req.body.user = req.user.userId;

	const instructor = await Instructor.create(req.body);
	res.status(StatusCodes.CREATED).json({ instructor: instructor });
};

const updateInstructor = async (req, res) => {
	const { id: instructorId } = req.params;

	const instructor = await Instructor.findOneAndUpdate(
		{ _id: instructorId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!instructor) {
		throw new CustomError.NotFoundError(
			`No comment with id: ${instructorId}`
		);
	}

	res.status(StatusCodes.OK).json({ instructor: instructor });
};

const deleteInstructor = async (req, res) => {
	const { id: instructorId } = req.params;

	const instructor = await Instructor.findOne({ _id: instructorId });

	if (!instructor) {
		throw new CustomError.NotFoundError(
			`No comment with id: ${instructorId}`
		);
	}

	await instructor.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createInstructor,
	updateInstructor,

	deleteInstructor,
};
