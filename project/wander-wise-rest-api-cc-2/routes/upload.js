const express = require('express');
const router = express.Router();

const {
  getAllUploads,
  getUpload,
  upload,
  deleteUpload,
  updateUpload,
  uploadCloudinary,
} = require('../controllers/upload');

router.route('/upload').post(upload);
// router.route('/files').get(getAllUploads);
// router.route('/files/:name').get(downloadUpload);
// router.route('/files/:name').delete(deleteUpload);
router.route('/uploadcloud').post(uploadCloudinary);

module.exports = router;