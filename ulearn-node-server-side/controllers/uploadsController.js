const path = require('path');
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
	const result = await cloudinary.uploader.upload(req.body.file, {
		use_filename: true,
		folder: 'file-upload',
	});

	res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

const uploadUserAvatar = async (req, res) => {
	const result = await cloudinary.uploader.upload(req.body.file, {
		use_filename: true,
		folder: 'profile-pictures',
		gravity: 'face',
		height: 150,
		quality: 100,
		width: 150,
		crop: 'thumb',
	});

	res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
	uploadImage,
	uploadUserAvatar,
};
