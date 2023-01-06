const express = require('express');
const router = express.Router();

const { uploadImage } = require('../controllers/uploadsController');

router.route('/upload').post(uploadImage);

module.exports = router;