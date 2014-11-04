// app/routes.js

var User = require('./models/user');
module.exports = function(app) {
  app.get('/api/users', function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      
      res.json(users);
    });
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
};