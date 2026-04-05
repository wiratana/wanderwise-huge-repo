const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');



const register = async (req, res) => {

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ 
    error: false,
    msg: 'Success register',
    data:{
      user: { 
        name: user.name,
        email: user.email,
      },
    },
    token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if(!user) {
    throw new UnauthenticatedError('Invalid email or password');
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid email or password');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ 
    error: false,
    msg: 'Success login',
    data:{
      user: {
        name: user.name,
        email: user.email,
      },
    },
    token,
  })

};


module.exports = {
  register,
  login,
};