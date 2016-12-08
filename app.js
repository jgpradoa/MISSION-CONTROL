//importing express
var express = require('express');
//initializing express
var app = express();
//importing logger
var morgan = require('morgan');
//to be able to read body parameters
var bodyParser = require('body-parser');
//config file
var config = require('./config/main');
//express JWT
var xJwt = require('express-jwt');
//JWT
var jwt = require('jsonwebtoken');
//authAPI
var authAPI = require('./routes/Auth'); 
//brotherAPI
var brotherAPI = require('./routes/brothers'); 
//userAPI
var userAPI = require('./routes/User'); 


//adding logger to express
app.use(morgan('combined'));

//parse urlencoded bodies to JSON
app.use(bodyParser.urlencoded({ extended: false }));  

//to be able to get object in req.body
app.use(bodyParser.json()); 

//to be able to exctract the JWT
app.use(xJwt({
  secret: config.secret,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

//to be able to handle JWT's errors
app.use(function (err, req, res, next) {
  console.log(req.headers.authorization);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

//adding JWT to all routes except login
app.use(xJwt({ 
          secret: config.secret
           //add to aud config file

        }).unless({path: ['/api/auth/login']}));

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//unsecured
app.use('/api/auth', authAPI);
//secured
app.use('/api/brothers', brotherAPI);
app.use('/api/user', userAPI);

const server = app.listen(config.port);
console.log("server up and jugging on port " + config.port);

//To-Do
//add refresh token