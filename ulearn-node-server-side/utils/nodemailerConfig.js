module.exports = {
	// host: 'smtp.gmail.com' , // 'smtp.ethereal.email',
	// port: 465, //587
	// secure: true,
	service: 'gmail',
	auth: {
		user: `${process.env.NODEMAILER_USER}`, // 'rosario.schmitt79@ethereal.email',
		pass: `${process.env.NODEMAILER_PASS}`, // 'WDwr721HwMh1EtnX65',
	},
};
