var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
  emailAddress: {type: String, required: true, index: {unique: true}},
  encryptedPassword: {type: String, required: true}
});

module.exports = mongoose.model('Account', accountSchema);