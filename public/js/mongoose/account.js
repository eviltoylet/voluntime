'use strict';

return function() {
  var mongoose = require('mongoose');
  var accountSchema = new mongoose.Schema({
    immutableIdentifier: String,
    encryptedPassword: String
  });
  return mongoose.model('Account', accountSchema);
}