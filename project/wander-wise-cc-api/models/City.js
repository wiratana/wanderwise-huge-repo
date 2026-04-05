const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name:{
    type: String,
  },
  country:{
    type: String,
  },
  population:{
    type: Number,
  },

  });

  module.exports = mongoose.model('City', CitySchema);