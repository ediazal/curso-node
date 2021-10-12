const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const model = mongoose.model('User', UserSchema);

module.exports = model;