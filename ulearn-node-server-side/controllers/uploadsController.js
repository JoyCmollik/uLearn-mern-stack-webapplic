const path = require('path');
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
	console.log(req.body);
	const result = await cloudinary.uploader.upload(
		req.body.file,
		{
			use_filename: true,
			folder: 'file-upload',
		}
	);
	console.log(result);

	// fs.unlinkSync(req.files.image.tempFilePath); // if the image is stored properly, we are not storing temporarily

	res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
	uploadImage,
};
