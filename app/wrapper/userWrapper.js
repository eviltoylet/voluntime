var User = require('../models/user');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var findExisting = function(emailAddress, foundCallback, notFoundCallback) {
  var existingQuery = User.where({emailAddress: emailAddress});
  existingQuery.findOne(function(err, user) {
    if (user == null) {
      notFoundCallback(new User({emailAddress: emailAddress}));
    } else {
      foundCallback(user);
    }
  });
}

module.exports.wrapInternal = function(input) {
  
};

module.exports.wrapExternal = function(input) {
  var save = function (response) {
    findExisting(input.emailAddress,
    function existingUser(user) {
      response.status(409).send({message: "A user with e-mail address " + input.emailAddress + " already exists."});
    },
    function createUser(user) {
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        console.error(err);
        response.status(500).send();
      }
      
      bcrypt.hash(input.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
          response.status(500).send();
        }
        user.encryptedPassword = hash;
        user.save(function(err, user) {
          if (err) {
            console.error(err);
            response.status(500).send();
          } else {
            response.status(200).send(user);
          }
        });
      });
    });
    });
  };
  
  return {
    save: save
  };
};