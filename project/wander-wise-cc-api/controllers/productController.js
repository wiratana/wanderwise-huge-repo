const Product = require('../models/Product.js');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const createProductOriginal = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    error: false,
    msg: 'Product created',
    data: {
      name: product.name,
      price: product.price,
      image: product.image,
    }
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ 
    error: false,
    msg: 'Success get all products',
    data: products
   });
};

const createProductFormMultipart = async (req, res) => {
  // Extract product data from request body
  const { name, price } = req.body;

  // Extract image from request files
  const { image } = req.files;

  // Check if image is uploaded
  if (!image) {
    throw new CustomError.BadRequestError('Please upload an image');
  }

  // generate filename with date and random string
  const date = Date.now();
  const randomString = Math.random().toString(36).substring(2, 7);
  const newFileName = `${randomString}-${date}`;
  
  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    use_filename: true,
    filename: newFileName,
    folder: 'file-upload',
  });

  // Delete image from local storage
  fs.unlinkSync(image.tempFilePath);

  // Create product
  const product = await Product.create({
    name,
    price,
    image: result.secure_url,
  });

  // Send response
  res.status(StatusCodes.CREATED).json({
    error: false,
    msg: 'Product created',
    data: {
      name: product.name,
      price: product.price,
      image: product.image,
    }
  });
};

module.exports = {
  createProductOriginal,
  getAllProducts,
  createProductFormMultipart
};