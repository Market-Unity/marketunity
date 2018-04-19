const newUser = require('./models/newUser');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


// Register a new User
const register = ({ username, password }, cb) => {
  let userTaken = true;
  let hold = JSON.stringify(checkUser(username, (err, data) => {
    if (err) { console.log('Error in Mongo Find func', err); }
    userTaken = JSON.stringify(data) !== '[]';
    
    if (userTaken === false) {
      // Hashing Password Here
      hashPass(password, (err, hash) => {
        let createUser = new newUser({
          username: username,
          password: hash
        });
  
        createUser.save((err, data) => {
          if (err) {
            console.log('There was a DB insertion error: ', err);
            cb(err, null);
          }
          cb(null, data);
        });
      });
    } else {
      err = 'Username taken!';
      cb(err, data);
    }
  }));
};

// Check if a username is already taken
const checkUser = (username, cb) => {
  newUser.find({
    username: username
  }, (err, data) => {
    if (err) { cb(err, null); }
    cb(null, data);
  });
};

const hashPass = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) { cb(err, null); }
      cb(null, hash);
    });
  });
};


module.exports = {
  register,
  checkUser
};