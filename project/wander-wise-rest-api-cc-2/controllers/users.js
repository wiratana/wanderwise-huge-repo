const {
  db,
  admin,
  usersRef,
  citiesRef,
  destinationsRef,
  destinationByCityRef } = require('../db/firebase');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const uploadFile = require('../middleware/upload');
const fs = require('fs');
const clodudinary = require('cloudinary').v2;

const getAllUsers = async (req, res) => {
  res.send('get all users route');
};

const getUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const uid = decodedToken.uid;

  const { userId } = req.params;
  try {
    const userDoc = usersRef.doc(userId);
    const user = await userDoc.get();
    const userData = user.data();

    const tempData = {
      id: user.id,
      ...userData,
    };

    
    console.log(tempData);



    if( !user.exists ) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    res.status(StatusCodes.OK).json({
      error: false,
      msg: `Success get user with ID ${userId}`,
      body: {
        uid: tempData.id,
        name: tempData.name,
        email: tempData.email,
        phone: tempData.phone,
        photo: tempData.photo,
      }
    })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      msg: error.message,
      body: null,
    });
  }

};

const createUser = async (req, res) => {
  res.send('create user route');
};

const deleteUser = async (req, res) => {
  res.send('delete user route');
};

const updateUser = async (req, res) => {
  res.send('update user route');
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};