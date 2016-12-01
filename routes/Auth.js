var express = require('express');
var bodyParser = require("body-parser");
//JWT
var jwt = require('jsonwebtoken');
//config file
var config = require('../config/main');

//user
var User = require('../models/User');

//defining router
var authAPI = express.Router();
//adding body parser to express
authAPI.use(bodyParser.json());
authAPI.use(bodyParser.urlencoded({ extended: true }));


//Method:POST
//	authenticating user
// returns a json token and the user with roles
authAPI.post('/auth', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'px' && req.body.password === '123456')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var user = new User("Jose", "Prado", "jgpradoa@xp.com", ["admin", "user:read", "user:write"], "ML") //firstName, lastName, email, role, library
    
  // We are sending the profile inside the token 
  //To-do add encode 64
  var token = jwt.sign(user, config.secret, { expiresIn: 1800 }); // 60*5 minutes

  res.json({ token: token, user: user});
});

//export this router to use in our app.js
module.exports = authAPI;