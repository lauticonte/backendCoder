const mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  username: String,
  password: String,
  name: String,
  address: String,
  age: Number,
  phone: String
});