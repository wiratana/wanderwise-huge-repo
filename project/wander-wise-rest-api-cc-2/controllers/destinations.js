const { create } = require('domain');
const { 
  db, 
  admin, 
  usersRef, 
  citiesRef, 
  destinationsRef, 
  destinationByCityRef } = require('../db/firebase');
  
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createDestination = async (req, res) => {
  res.send('create destination route');
};

const getAllDestinations = async (req, res) => {
  res.send('get all destinations route');
};

module.exports = {
  createDestination,
  getAllDestinations,
}