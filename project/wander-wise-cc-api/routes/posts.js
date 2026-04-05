const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getAllPostsUser,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require('../controllers/posts');

const { uploadPostImage } = require('../controllers/uploads');

router.route('/home').get(getAllPosts);
router.route('/').post(createPost).get(getAllPostsUser);
router.route('/uploads').post(uploadPostImage);
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;