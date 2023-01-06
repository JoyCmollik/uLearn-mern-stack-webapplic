const path = require('path');
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
	const result = await cloudinary.uploader.upload(
		req.body.file,
		{
			use_filename: true,
			folder: 'file-upload',
		}
	);

	res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
	uploadImage,
};
