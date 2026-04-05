const uploadFile = require('../middleware/upload');
const fs = require('fs');
const baseUrl = 'http://localhost:8080/files/';
const cloudinary = require('cloudinary').v2;

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    res.status(200).send({
      message: 'Uploaded the file successfully: ' + req.file.originalname,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


const uploadCloudinary = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete the file from local storage after successful upload to Cloudinary
    fs.unlinkSync(req.file.path);


    res.status(200).send({
      message: "Uploaded the file successfully to Cloudinary",
      imageUrl: result.secure_url, // URL of the uploaded image on Cloudinary
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    });
  }
};

module.exports = {
  upload,
  uploadCloudinary,
};