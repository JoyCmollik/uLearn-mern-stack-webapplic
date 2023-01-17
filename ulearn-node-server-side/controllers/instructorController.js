const Instructor = require('../models/Instructor');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { populate } = require('../models/Course');

const createInstructor = async (req, res) => {
	res.send('instructor created');
};

const updateInstructor = async (req, res) => {
	res.send('instructor updated');
};

const deleteInstructor = async (req, res) => {
	res.send('instructor deleted successfully');
};

module.exports = {
	createInstructor,
	updateInstructor,
	deleteInstructor,
};
