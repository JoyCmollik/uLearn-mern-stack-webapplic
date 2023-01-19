const Testimonial = require('../models/Testimonial');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createTestimonial = async (req, res) => {
	req.body.user = req.user.userId;

	const testimonial = await Testimonial.create(req.body);
	res.status(StatusCodes.CREATED).json({ testimonial: testimonial });
};
const getAllTestimonial = async (req, res) => {
	const testimonials = await Testimonial.find({});

	res.status(StatusCodes.OK).send({
		testimonials: testimonials,
		count: testimonials.length,
	});
};
const getSingleTestimonial = async (req, res) => {
	const { id: testimonialId } = req.params;

	const testimonial = await Testimonial.findOne({ _id: testimonialId });

	if (!testimonial) {
		throw new CustomError.NotFoundError(
			`No testimonial with id: ${testimonialId}`
		);
	}
	res.status(StatusCodes.OK).json({ testimonial: testimonial });
};
const updateTestimonial = async (req, res) => {
	const { id: testimonialId } = req.params;

	const testimonial = await Testimonial.findOneAndUpdate(
		{ _id: testimonialId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!testimonial) {
		throw new CustomError.NotFoundError(
			`No testimonial with id: ${testimonialId}`
		);
	}

	res.status(StatusCodes.OK).json({ testimonial: testimonial });
};

const deleteTestimonial = async (req, res) => {
	const { id: testimonialId } = req.params;

	const testimonial = await Testimonial.findOne({ _id: testimonialId });

	if (!testimonial) {
		throw new CustomError.NotFoundError(
			`No testimonial with id: ${testimonialId}`
		);
	}

	await testimonial.remove();
	res.status(StatusCodes.OK).json({ msg: 'Successfully removed an item.' });
};

module.exports = {
	createTestimonial,
	getAllTestimonial,
	getSingleTestimonial,
	updateTestimonial,
	deleteTestimonial,
};
