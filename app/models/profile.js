var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  authenticationSource: {
    type: String,
    required: true
  },
  authenticationIdentifier: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  emailAddress: {
    type: String
  }
});
profileSchema.index({
  authenticationSource: 1,
  authenticationIdentifier: 1
});
profileSchema.path('authenticationSource').validate(function (value) {
  return /^(facebook|internal)$/i.test(value);
});

var profile = mongoose.model('Profile', profileSchema);
module.exports = profile;