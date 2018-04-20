const newUser = require('./models/newUser');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


// Register a new User
const register = ({ username, password }, cb) => {
  let userTaken = true;
  // Checks if username is taken
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

  // Checks if username is taken
const checkUser = (username, cb) => {
  newUser.find({
    username: username
  }, (err, data) => {
    if (err) { cb(err, null); }
    cb(null, data);
  });
};

// Hash Password
const hashPass = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) { cb(err, null); }
      cb(null, hash);
    });
  });
};

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

    dbHash = JSON.stringify(data[0].password);

    console.log(dbHash, '<<<<====== dbHash');
    hashPass(password, (err, data) => {
      passHash = JSON.stringify(data);

      console.log(passHash, '<<<<====== passHash');
    });

    bcrypt.compare(dbHash, passHash, (err, result) => {
      if (err) { 
        console.log('There was a hashing error: ', err);
        cb(err, null);
      }
      authenticated = result;
      console.log(authenticated);
      cb(null, authenticated);
    });
  });
};


module.exports = {
  register,
  checkUser,
  authCheck
};