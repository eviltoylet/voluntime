var User = require('../models/user');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var findExisting = function (emailAddress, foundCallback, notFoundCallback) {
  var existingQuery = User.where({
    emailAddress: emailAddress
  });
  existingQuery.findOne(function (err, user) {
    if (user == null) {
      notFoundCallback(new User({
        emailAddress: emailAddress
      }));
    } else {
      foundCallback(user);
    }
  });
}

module.exports.wrapInternal = function (input) {

};

module.exports.wrapExternal = function (request) {
  var inputUser = request.body;
  var save = function (response) {
    findExisting(inputUser.emailAddress,
      function existingUser(user) {
        response.status(409).send({
          message: "A user with e-mail address " + user.emailAddress + " already exists."
        });
      },
      function createUser(user) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) {
            console.error(err);
            response.status(500).send();
          }

          bcrypt.hash(inputUser.password, salt, function (err, hash) {
            if (err) {
              console.error(err);
              response.status(500).send();
            } else {
              user.encryptedPassword = hash;
              user.save(function (err, user) {
                if (err) {
                  console.error(err);
                  response.status(500).send();
                } else {
                  response.status(200).send();
                }
              });
            }
          });
        });
      });
  };

  var update = function (response) {
    var inputEmail = request.params.email;
    var inputUser = request.body;
    findExisting(inputEmail,
      function existingUser(user) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) {
            console.error(err);
            response.status(500).send();
          } else {
            bcrypt.hash(inputUser.password, salt, function (err, hash) {
              if (err) {
                console.error(err);
                response.status(500).send();
              }
              user.emailAddress = inputUser.emailAddress;
              user.encryptedPassword = hash;
              user.save(function (err, user) {
                if (err) {
                  console.error(err);
                  if (err.code == 11000) {
                    response.status(409).send({
                      message: "There is already a user with the e-mail address " + inputUser.emailAddress + ". Try a different one."
                    });
                  } else {
                    response.status(500).send();
                  }
                } else {
                  response.status(200).send();
                }
              });
            });
          }
        });
      },
      function newUser(user) {
        response.status(404).send({
          message: "No user with the e-mail address " + user.emailAddress + ". Could not update."
        });
      });
  };

  return {
    save: save,
    update: update
  };
};