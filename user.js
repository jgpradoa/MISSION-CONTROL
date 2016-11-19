var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var cookieParser = require('cookie-parser');

var whitelist = ['http://localhost:8000', 'chrome-extension://aicmkgpgakddgnaphhhpliifpcfhicfo','*'];
var corsOptions = {
  origin: function(origin, callback){
    console.log("inside origin " + origin); 
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

//defining router
var apiRouter = express.Router();
//adding body parser to express
apiRouter.use(cookieParser());
apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: true }));


apiRouter.use(function (req, res, next) {
  console.log('Time:', Date.now())
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next()
});

//Method:POST
//	adding Student
apiRouter.post('/auth/', cors(corsOptions), function(req, res){
    console.log("inside auth " + JSON.stringify(req.headers)); 
	var info = req.body;
    /*console.log("auth "+ JSON.stringify(info)); 
    var key = "usr";
    var value = {brother: "Jose Prado", location: {latitude:28.066464399999997,longitude:-82.40067619999999}};
    res.cookie(key, value, { maxAge: 900000, httpOnly: true, secure: true}); */
	//res.send({data: true, brother: {name: "Jose Prado", location: {latitude:28.066464399999997,longitude:-82.40067619999999}}});
    res.status(500).send({ error: 'worng username/password' });
});

apiRouter.get('/getAll', cors(corsOptions), function(req, res){
    console.log("hi inside get ALL :)"); 
    var brothers = [];
    brothers.push({id: 1,  fName: "Jose",  lName: "Prado"});
    brothers.push({id: 1,  fName: "Memo",  lName: "Prado"});
    brothers.push({id: 1,  fName: "Guillermo",  lName: "Prado"});

    //returning brothers
    res.send(JSON.stringify({data: brothers}));  
    
});


//export this router to use in our app.js
module.exports = apiRouter;