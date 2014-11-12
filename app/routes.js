// app/routes.js

var ProfileWrapper = require('./wrapper/profileWrapper');
var UserWrapper = require('./wrapper/userWrapper');
module.exports = function (app) {
  app.get('/api/profiles', function (req, res) {
    Profile.find(function (err, profiles) {
      if (err) {
        res.send(err);
      }

      res.json(profiles);
    });
  });

  app.post('/api/profiles', function (req, res) {
    var profile = ProfileWrapper.wrapExternal(req);
    profile.save(res);
  });

  app.post('/api/users', function (req, res) {
    // TODO: Figure out how I can do input validation?
    var user = UserWrapper.wrapExternal(req);
    user.save(res);
  });

  app.put('/api/users/:email', function (req, res) {
    var user = UserWrapper.wrapExternal(req);
    user.update(res);
  });

  app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html');
  });
};