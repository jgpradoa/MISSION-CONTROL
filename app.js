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

//adding logger to express
app.use(morgan('combined'));

//parse urlencoded bodies to JSON
app.use(bodyParser.urlencoded({ extended: false }));  

//to be able to get object in req.body
app.use(bodyParser.json()); 

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var brotherAPI = express.Router();

brotherAPI.get('/getAll', function(req, res){
    
    brothers = [{name: 'Sebastian Wright', location: "London", picLocation: '../../../../imgs/prophecy.jpg'},{name: 'Christopher Barrios', location: "USA", picLocation: '../../../../imgs/baldomero.jpg'},{name:'Kevin Chow', location: "Rome", picLocation: '../../../../imgs/absoluto.jpg'},
                    {name:'Josue Marrero', location: "London", picLocation: '../../../../imgs/inquiridor.jpg'},{name: 'Juan Garcia', location: "USA", picLocation: '../../../../imgs/diligencio.jpg'},{name: 'Eddy Hiraldo', location: "Mexico", picLocation: '../../../../imgs/jevi.jpg'},
                    {name: 'Jose Prado', location: "London", picLocation: '../../../../imgs/titus.jpg'},{name: 'Isaac Prado', location: "USA", picLocation: '../../../../imgs/theseus.jpg'},{name: 'Juanluis Giudicelli-Ortiz', location: "Mexico", picLocation: '../../../../imgs/leonidas.jpg'}]

    //returning brothers
    res.send({data: brothers});  
});

app.use('/api', brotherAPI);

const server = app.listen(config.port);
console.log("server up and jugging on port " + config.port);

//To-Do
//add passportJS
//add 