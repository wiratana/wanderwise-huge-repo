const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadPostImage = async (req, res) => {
  // generate filename with date and random string
  const date = Date.now();
  const randomString = Math.random().toString(36).substring(2, 7);
  const newFileName = `${randomString}-${date}`;

  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    filename: newFileName,
    folder: 'file-upload',
  });
  
  fs.unlinkSync(req.files.image.tempFilePath);

  return res.status(StatusCodes.OK).json({ 
    error: false,
    msg: 'Success upload image',
    data: {
      image: { 
        src: result.secure_url
      }}
  });
};

module.exports ={ 
  uploadPostImage,
}