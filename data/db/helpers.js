const newUser = require('./models/newUser.js');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


// TODO: Create Register Function Helper Here
const register = ({ username, password }, callback) => {
  // Run password field through Bcrypt here first
  let createUser = new User({
    username: username,
    password: password
  });
  
  mongoose.insert(createUser);
};



module.exports = {
  register
};