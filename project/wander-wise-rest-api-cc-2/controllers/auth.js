const { 
  db,
  admin,
  firebase,
   usersRef } = require('../db/firebase');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const errorHandlerMiddleware = require('../middleware/error-handler');
const uploadFile = require('../middleware/upload');
const fs = require('fs');
const { log } = require('console');
const { defaultMaxListeners } = require('events');
const cloudinary = require('cloudinary').v2;

const login = async (req, res) => {
  const { email, password } = req.body;
  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();

  req.session.uid = user.uid;
  req.session.email = user.email;
  // req.session.token = user.refreshToken;
  req.session.token = idToken;
  // req.session.accesstoken = user.accessToken;

  res.status(StatusCodes.OK).json({ 
    error: false,
    msg: 'Login successful',
    body: {
      uid: user.uid, 
      name: user.displayName,
      email: user.email, 
      token: idToken, 
      accesstoken: user.accessToken,
      // user,
    },
   });
};

const logout = async (req, res) => {
  firebase.auth().signOut()
  .then(() => {
    req.session.destroy();
    res.status(StatusCodes.OK).json({ 
      error: false,
      msg: 'Logout successful',
    });
  });
};

const register = async (req, res) => {
  const { email, password, username } = req.body;
  const defaultPhoto = `https://res.cloudinary.com/dwqqrl18b/image/upload/v1703091596/uz1wpw5ipikfsfpkh5dd.jpg`;
  // console.log(defaultPhoto);
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await user.updateProfile({ displayName: username });
    await user.updateProfile({ photoURL: defaultPhoto });
    req.session.uid = user.uid;
    
    const tmpUid = user.uid;
    const tmpName = user.displayName;
    const tmpEmail = user.email;
    // const tmpPhone = user.phoneNumber;
    const tmpPhoto = user.photoURL;
    // user.photoURL = defaultPhoto;

    const userDoc = usersRef.doc();

    const tempData = {
      idUser: tmpUid,
      name: tmpName,
      email: tmpEmail,
      // phone: tmpPhone,
      photo: tmpPhoto,
    };

    const addUserData = await userDoc.set(tempData);
    console.log(addUserData);

    res.status(StatusCodes.CREATED).json({
      error: false, 
      msg: 'User created',
      body: {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        photo: user.photoURL,
        // user,
        },
      });
  } catch (error) {
    throw new BadRequestError('Invalid signup credentials');
  }
};

const fetchUser = async (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;
  try {
    const userRecord = await admin.auth().getUser(userId);
    console.log('Successfully fetched user data:', userRecord.toJSON());
    
    const tmpUid = userRecord.uid;
    const tmpName = userRecord.displayName;
    const tmpEmail = userRecord.email;
    const tmpPhone = userRecord.phoneNumber;
    const tmpPhoto = userRecord.photoURL;

    // return userRecord;
    res.status(StatusCodes.OK).json({
      error: false,
      msg: `Success get user with ID ${userId}`,
      body: {
        uid: tmpUid,
        name: tmpName,
        email: tmpEmail,
        // phone: tmpPhone,
        photo: tmpPhoto,
        // userRecord,
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const updateUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;

  
  try {
    // upload file process to req.file
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ msg: "Please upload a file!" });
    }
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Delete the file from local storage after successful upload to Cloudinary
    fs.unlinkSync(req.file.path);
    //end upload file process to req.file

    const { 
      name, 
      email, 
      // phone
     } = req.body;

    const userRecord = await admin.auth().getUser(userId);
    console.log('Successfully fetched user data:', userRecord.toJSON());

    const tmpUid = userRecord.uid;
    const tmpName = userRecord.displayName;
    const tmpEmail = userRecord.email;
    // const tmpPhone = userRecord.phoneNumber;
    const tmpPhoto = userRecord.photoURL;

     try {
      
       const newData = await admin.auth().updateUser(userId, {
         displayName: name || tmpName,
         email: email || tmpEmail,
        //  phoneNumber: phone || tmpPhone,
         photoURL: result.secure_url || tmpPhoto,
       });
   
       console.log(newData);
   
       console.log('Successfully updated user', newData.toJSON());
       res.status(StatusCodes.OK).json({
         error: false,
         msg: `Success update user with ID ${userId}`,
         body: {
           // uid: userRecord.uid,
           name: newData.displayName,
           email: newData.email,
          //  phone: newData.phoneNumber,
           photo: newData.photoURL,
         }
       });
     } catch (error) {
        console.error('Error updating user:', error);
        throw error;
     }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


const updateUserName = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;

  try {
    const { 
      name, 
     } = req.body;

    const userRecord = await admin.auth().getUser(userId);
    console.log('Successfully fetched user data:', userRecord.toJSON());

    const tmpUid = userRecord.uid;
    const tmpName = userRecord.displayName;

    console.log(tmpName);
    console.log(name);

     try {
      
       const newData = await admin.auth().updateUser(userId, {
         displayName: name || tmpName,
       });
   
       console.log(newData);
   
       console.log('Successfully updated user', newData.toJSON());
       res.status(StatusCodes.OK).json({
         error: false,
         msg: `Success update user with ID ${userId}`,
         body: {
           name: newData.displayName,
         }
       });
     } catch (error) {
        console.error('Error updating user:', error);
        throw error;
     }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const updateUserEmail = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;
  
  try {
    const { 
      email, 
     } = req.body;

    const userRecord = await admin.auth().getUser(userId);
    console.log('Successfully fetched user data:', userRecord.toJSON());

    const tmpUid = userRecord.uid;
    const tmpEmail = userRecord.email;

    console.log(tmpEmail);
    console.log(email);

     try {
      
       const newData = await admin.auth().updateUser(userId, {
         email: email || tmpEmail,
       });
   
       console.log(newData);
   
       console.log('Successfully updated user', newData.toJSON());
       res.status(StatusCodes.OK).json({
         error: false,
         msg: `Success update user with ID ${userId}`,
         body: {
          //  name: newData.displayName,
           email: newData.email,
         }
       });
     } catch (error) {
        console.error('Error updating user:', error);
        throw error;
     }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const forgotPassword = async (req, res) => {
  res.send('forgot password route');
};

const resetPassword = async (req, res) => {
  res.send('reset password route');
};

const updatePassword = async (req, res) => {
  res.send('update password route');
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;
  
  try {
    const userRecord = await admin.auth().deleteUser(userId);
    firebase.auth().signOut()
    .then(() => {
      req.session.destroy();
      // res.status(StatusCodes.OK).json({ 
      //   error: false,
      //   msg: 'Logout successful',
      // });
      console.log('Logout successful');
      return;
    });

    console.log('Successfully deleted user', userId);
    res.status(StatusCodes.OK).json({
      error: false,
      msg: `Success delete user with ID ${userId}`,
      body: {
        userRecord,
      }
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  updatePassword,
  fetchUser,
  updateUser,
  updateUserName,
  updateUserEmail,
  deleteUser,
};
