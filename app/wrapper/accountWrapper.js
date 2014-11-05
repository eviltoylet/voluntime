var Account = require('../models/account.js');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var getExistingOrNew = function(emailAddress) {
  var existingQuery = Account.where({emailAddress: emailAddress});
  var existing = null;
  existingQuery.findOne(function(err, account) {
    existing = account;
  });
  
  if (existing == null) {
    return new Account({emailAddress: emailAddress});
  } else {
    return existing; 
  }
};

var isPersisted = function(account) {
  return account._id != null;
}

module.exports.wrapInternal = function(input) {
  
};

module.exports.wrapExternal = function(input) {
  var save = function () {
    var account = getExistingOrNew(input.emailAddress);
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        console.error(err);
      }
      
      bcrypt.hash(input.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
        }
        account.encryptedPassword = hash;
        account.save(function(err) {
          console.error(err);
        });
      });
    });
  };
  
  return {
    save: save
  };
};