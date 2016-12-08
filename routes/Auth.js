var express = require('express');
var bodyParser = require("body-parser");
//JWT
var jwt = require('../utils').jwt;

//user
var User = require('../models/User');
var Brother =  require('../models/Brother');

//defining router
var authAPI = express.Router();
//adding body parser to express
authAPI.use(bodyParser.json());
authAPI.use(bodyParser.urlencoded({ extended: true }));


//Method:POST
//	authenticating user
// returns a json token and the user with roles
authAPI.post('/login', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'px' && req.body.password === '123456')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var user = new User(new Brother('Jose','Prado', null, 2, '../../../../imgs/titus.jpg'), ["admin", "user:read", "user:write", "home:read", "admin:read", "admin:write"], 'jgpradoa@hotmail.com') //firstName, lastName, email, role, library
  console.log("user: " + JSON.stringify(user));
  // We are sending the profile inside the token 
  //To-do add encode 64
  var token = jwt.create(user); // 60*5 minutes

  res.json({ token: token, user: user});
});

//export this router to use in our app.js
module.exports = authAPI;