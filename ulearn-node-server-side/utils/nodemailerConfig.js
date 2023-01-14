module.exports = {
	host: 'smtp.ethereal.email',
	port: 465, //587
	secure: true,
	//service: 'gmail',
	auth: {
		user: `rosario.schmitt79@ethereal.email`, //${process.env.NODEMAILER_USER}
		pass: `WDwr721HwMh1EtnX65`, //${process.env.NODEMAILER_PASS}
	},
};
