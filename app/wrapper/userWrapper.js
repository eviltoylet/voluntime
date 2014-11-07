var User = require('../models/user');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var getExistingOrNew = function(emailAddress) {
  var existingQuery = User.where({emailAddress: emailAddress});
  var existing = null;
  existingQuery.findOne(function(err, user) {
    existing = user;
  });
  
  if (existing == null) {
    return new User({emailAddress: emailAddress});
  } else {
    return existing; 
  }
};

var isPersisted = function(user) {
  return user._id != null;
}

module.exports.wrapInternal = function(input) {
  
};

module.exports.wrapExternal = function(input) {
  var save = function () {
    var user = getExistingOrNew(input.emailAddress);
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        console.error(err);
      }
      
      bcrypt.hash(input.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
        }
        user.encryptedPassword = hash;
        user.save(function(err) {
          console.error(err);
        });
      });
    });
  };
  
  return {
    save: save
  };
};