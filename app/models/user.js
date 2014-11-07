var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  emailAddress: {type: String, required: true, index: {unique: true}},
  encryptedPassword: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);