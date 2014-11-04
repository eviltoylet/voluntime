'use strict';

return function() {
  var mongoose = require('mongoose');
  var userSchema = new mongoose.Schema({
    authenticationSource: String,
    authenticationIdentifier: String
  });
  return mongoose.model('User', userSchema);
};