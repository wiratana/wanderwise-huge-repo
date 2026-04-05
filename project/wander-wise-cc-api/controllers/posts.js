const Post = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllPosts = async (req, res) => {
  const posts = await Post.find({ }).sort('createdAt');
  res.status(StatusCodes.OK).json({ count: posts.length, posts});
}

const getAllPostsUser = async (req, res) => {
  const posts = await Post.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ count: posts.length, posts });
};

const getPost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
    createdBy: userId,
  });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({ post});
};

const createPost = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const deletePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOneAndRemove({ 
    _id: postId,
    createdBy: userId,
  });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).send('Deleted successfully');
};

const updatePost = async (req, res) => {
  const {
    body: { title, image, description },
    user: { userId },
    params: { id: postId },
  } = req;

  if (title === '' || image === '' || description === '') {
    throw new BadRequestError('Title, Image or Description fields cannot be empty');
  }

  const post = await Post.findByIdAndUpdate({
    _id: postId,
    createBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    });

    if (!post) {
      throw new NotFoundError(`No post with id ${postId}`);
    }
    res.status(StatusCodes.OK).json({ post});
};

module.exports = {
  getAllPosts,
  getAllPostsUser,
  getPost,
  createPost,
  deletePost,
  updatePost, 
};