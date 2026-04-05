const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, 'Please provide title'],
    maxLength: 100,
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: [true, 'Please provide description'],
    maxLength: 500,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    // require: [true, 'Please provide user'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);

