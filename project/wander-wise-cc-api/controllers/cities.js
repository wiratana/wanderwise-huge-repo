const City = require('../models/City');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const createCity = async (req, res) => {
  const city = await City.create(req.body);
  res.status(StatusCodes.CREATED).json({ 
    error: false,
    msg: 'Success create city',
    data: city });
}

module.exports = {
  createCity,
}