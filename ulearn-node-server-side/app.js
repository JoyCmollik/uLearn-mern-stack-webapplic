require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require('./db/connect');

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const lessonRouter = require('./routes/lessonRoutes');
const sectionRouter = require('./routes/sectionRoutes');
const courseRouter = require('./routes/courseRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const topicRouter = require('./routes/topicRoutes');
const commentRouter = require('./routes/commentRoutes');
const instructorRouter = require('./routes/instructorRoutes');
const testimonialRouter = require('./routes/testimonialRoutes');

// this is a list of routers
// testing
// another
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

console.log('origin', process.env.PRODUCTION);

app.set('trust proxy', 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
);
app.use(helmet());
app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: process.env.PRODUCTION,
	})
);
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'));
app.use(
	express.json({
		limit: '50mb',
	})
);
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
	console.log(req.cookies);
	res.send('U Learn');
});
app.get('/api/v1', (req, res) => {
	console.log(req.signedCookies);
	res.send('U Learn');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/lessons', lessonRouter);
app.use('/api/v1/sections', sectionRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/images', uploadRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/topics', topicRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/instructors', instructorRouter);
app.use('/api/v1/testimonials', testimonialRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
