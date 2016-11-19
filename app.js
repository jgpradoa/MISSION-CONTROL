//importing express
var express = require('express');
//importing logger
var morgan = require('morgan');

//brother API
var broApi = require('./brother.js'); 

var userApi = require('./user.js'); 

//initializing express
var app = express();

//adding logger to express
app.use(morgan('combined'));
//adding brother's api to express
app.use('/api/brother', broApi); 

app.use('/api/user',userApi);

//starting express on port 8081
app.listen(8081);

//To-Do
//add passportJS
//add 