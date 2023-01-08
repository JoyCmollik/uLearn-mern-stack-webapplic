const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport(nodemailerConfig);
	console.log(process.env.USER);

	return transporter.sendMail({
		from: `"uLearn" <${process.env.NODEMAILER_USER}>`, // sender address
		to,
		subject,
		html,
	});
};

module.exports = sendEmail;
