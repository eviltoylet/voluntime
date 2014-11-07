var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  authenticationSource: String,
  authenticationIdentifier: String
});
module.exports = mongoose.model('Profile', profileSchema);
