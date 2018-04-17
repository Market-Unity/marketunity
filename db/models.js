const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  favorites: Array,
});

const newUser = new userSchema(userObj);

module.exports = userSchema;
module.exports = newUser;
