var Profile = require('../models/profile');

var findExisting = function (key, foundCallback, notFoundCallback) {
  var existingQuery = Profile.where(key);
  existingQuery.findOne(function (err, profile) {
    if (profile == null) {
      notFoundCallback(new Profile(key));
    } else {
      foundCallback(profile);
    }
  });
};

module.exports.wrapExternal = function (request) {
  var inputProfile = request.body;

  var save = function (response) {
    findExisting({
      authenticationSource: inputProfile.authenticationSource,
      authenticationIdentifier: inputProfile.authenticationIdentifier
    }, function existingProfile(profile) {
      response.status(400).send({
        message: "A profile for " + inputProfile.authenticationIdentifier + " (" + inputProfile.authenticationSource + ") already exists."
      });
    }, function createProfile(profile) {
      profile.firstName = inputProfile.firstName;
      profile.lastName = inputProfile.lastName;
      profile.save(function (err, profile) {
        if (err) {
          console.error(err);
          response.status(500).send();
        } else {
          response.status(200).send();
        }
      });
    })
  };

  var update = function (response) {

  }

  return {
    save: save
  };
}