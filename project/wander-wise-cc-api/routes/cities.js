const express = require('express');
const router = express.Router();

const { 
  getAllCities, 
  getCity, 
  createCity, 
  deleteCity, 
  updateCity 
} = require('../controllers/cities');

router.route('/').post(createCity);
// router.route('/:id').get(getCity).delete(deleteCity).patch(updateCity);

module.exports = router;