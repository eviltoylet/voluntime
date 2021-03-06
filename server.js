// server.js

// modules =================================================
var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();

// configuration ===========================================

// config files
var dbConfig = require('./config/db');
var appConfig = require('./config/app');
var secretsConfig = require('./config/secrets');

// set our port
var port = process.env.PORT || appConfig.port;

// connect to our mongoDB database 
mongoose.connect(dbConfig.url);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Cookie config
app.use(cookieParser(secretsConfig.cookieSecret)); // populates req.signedCookies
app.use(cookieSession({
  secret: secretsConfig.sessionSecret,
  resave: true,
  saveUninitialized: true
})); // populates req.session, needed for CSRF

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('hbs').__express);

app.use(csrf());

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;