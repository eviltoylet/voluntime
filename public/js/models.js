var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  immutableIdentifier: String,
  encryptedPassword: String
});
exports.account = mongoose.model('Account', accountSchema);

var userSchema = new mongoose.Schema({
  authenticationSource: String,
  authenticationIdentifier: String
});
exports.user = mongoose.model('User', userSchema);
