const admin = require('firebase-admin');
const  { UnauthenticatedError }  = require('../errors');

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Decoded Token:', decodedToken);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error('Firebase Authentication Error:', error);
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = isAuthenticated;