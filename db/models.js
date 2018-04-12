const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  favorites: Array,

});

const newUser = new userSchema(userObj);

module.exports = userSchema;
module.exports = newUser;
