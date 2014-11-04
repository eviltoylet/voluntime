var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  authenticationSource: String,
  authenticationIdentifier: String
});
module.exports = mongoose.model('User', userSchema);
