const express = require('express');
const router = express.Router();

const {
  getAllDestinations,
  // getDestination,
  createDestination,
  // deleteDestination,
  // updateDestination,
} = require('../controllers/destinations');

router.route('/').get(getAllDestinations).post(createDestination);

module.exports = router;