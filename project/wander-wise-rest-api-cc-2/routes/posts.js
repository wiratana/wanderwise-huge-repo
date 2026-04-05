const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/upload');

const {
  getAllPosts,
  getAllPostsUser,
  getPost,
  createPost,
  createPostText,
  deletePost,
  updatePost,
  countLike,
  addLike,
  deleteLike,
} = require('../controllers/posts');

router.route('/home').get(getAllPosts);
router.route('/').get(getAllPostsUser).post(createPost);
router.route('/uploadpost').post(createPostText);
router.route('/:postId').get(getPost).put(updatePost).delete(deletePost);
router.route('/likes/:postId').get(countLike)
// router.route('/likes/:postId').post(addLike).delete(deleteLike);

module.exports = router;