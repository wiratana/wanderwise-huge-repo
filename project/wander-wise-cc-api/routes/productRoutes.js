
const express = require('express');
const router = express.Router();

const { createProductOriginal, getAllProducts, createProductFormMultipart} = require('../controllers/productController');
const { uploadPostImage } = require('../controllers/uploads');

router.route('/').post(createProductOriginal).get(getAllProducts);
router.route('/multipart').post(createProductFormMultipart);
router.route('/uploads').post(uploadPostImage);

module.exports = router;