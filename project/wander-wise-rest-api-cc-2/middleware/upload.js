const util = require("util");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const maxSize = 5 * 1024 * 1024;

let storageLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/tmp");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storageLocal,
  limits: { fileSize: maxSize },
}).single("image");



// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Specify the Cloudinary folder where you want to store files
//     format: async (req, file) => 'png,jgp,jpeg,JPG,JPEG,PNG', // Set the desired format (you can adjust this based on file type)
//   },
// });

// const upload = multer({ storage: storage }).single('file');


let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = 
uploadFileMiddleware;
// upload;