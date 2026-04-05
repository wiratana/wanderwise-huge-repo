const express = require('express');
const router = express.Router();

const {
  getAllCities,
  getCity,
  createCity,
  deleteCity,
  updateCity,
} = require('../controllers/cities');

router.route('/').get(getAllCities).post(createCity);
router.route('/:cityId').get(getCity).patch(updateCity).delete(deleteCity);

module.exports = router;