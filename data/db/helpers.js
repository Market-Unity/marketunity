const newUser = require('./models/newUser');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


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
const userAvailable = ({ username }, cb) => {
  newUser.find({
    username: username
  }, (err, data) => {
    if (err) { cb(err, null); }
    if (JSON.stringify(data) === '[]') { data = true; } else { data = false; }
    cb(null, data);
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
  checkUser(username, (err, data) => {
    if (err) { 
      err = 'Username does not exist!'; 
      console.log(err);
      cb(err, null);
    }

    dbHash = data[0].password;

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

// Imp Session System


module.exports = {
  register,
  userAvailable,
  authCheck
};