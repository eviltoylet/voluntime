// app/routes.js

var User = require('./models/user');
var AccountWrapper = require('./wrapper/accountWrapper');
module.exports = function(app) {
  app.get('/api/users', function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      
      res.json(users);
    });
  });
  
  app.post('/api/accounts', function(req, res) {
    // TODO: Figure out how I can do input validation?
    var account = AccountWrapper.wrapExternal(req.body);
    account.save();
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
};