const newUser = require('./models/newUser');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Register a new User. Will return boolean for user creation.
const register = ({ username, password }, cb) => {
  // Checks if username is taken
  let hold = JSON.stringify(userAvailable(username, (err, available) => {
    if (err) { console.log('Error in Mongo Find func', err); }
        
    if (available === true) {
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
          data = available;
          cb(null, data);
        });
      });
    } else {
      data = available;
      cb(err, data);
    }
  }));
};

  // Checks if username is already in DB
const userAvailable = (username, cb) => {
  let hash = '';
  newUser.find({
    username: username
  }, (err, data) => {
    if (err) { cb(err, null); }
    if (JSON.stringify(data) === '[]') {
      data = true; 
    } else {
      hash = data[0].password;
      data = false;
    }
    cb(null, data, hash);
  });
};

// Hash Password. Will return hash.
const hashPass = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) { cb(err, null); }
      cb(null, hash);
    });
  });
};


// Authenticate Passwords. Will return boolean. 
const authCheck = ({ username, password }, cb) => {
  let dbHash = '';
  let passHash = '';
  let authenticated = false;

  // If User Exist, Get Hash
  userAvailable(username, (err, data, hash) => {
    if (err) { 
      err = 'Username does not exist!'; 
      console.log(err);
      cb(err, null);
    }

    dbHash = hash;

    bcrypt.compare(password, dbHash, (err, result) => {
      if (err) { 
        console.log('There was a hashing error: ', err);
        cb(err, null);
      }
      authenticated = result;
      cb(null, authenticated);
    });
  });
};

insertFav = ({ username, favorite }, cb) => {
  newUser.findOne({ username: username }, (err, user) => {
    if (err) { cb(err, null); }
    user.favorites.push(favorite);
    cb(null, data = 'Successful');
    
  });
};

verifyToken = ({ token }, cb) => {
  jwt.verify(token, 'secretkey', function (err, data) {
    if (err) { cb(err, null); }
    cb(null, data);
  });
};


module.exports = {
  register,
  userAvailable,
  authCheck,
  insertFav,
  verifyToken
};