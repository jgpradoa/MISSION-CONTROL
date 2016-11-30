var express = require('express');
var bodyParser = require("body-parser");
//JWT
var jwt = require('jsonwebtoken');
//config file
var config = require('../config/main');

//defining router
var apiRouter = express.Router();
//adding body parser to express
apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: true }));


//Method:POST
//	authenticating user
// returns a json token and the user with roles
apiRouter.post('/auth', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'px' && req.body.password === '123456')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var brother = {name: "Jose Prado", location: {latitude:28.066464399999997,longitude:-82.40067619999999},  permissions: [
  "admin",
  "user:read",
  "user:write"
]};


  // We are sending the profile inside the token 
  //To-do add encode 64
  var token = jwt.sign(brother, config.secret, { expiresIn: 1800 }); // 60*5 minutes

  res.json({ token: token, data: true, bro: brother});
});

//export this router to use in our app.js
module.exports = apiRouter;