var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');

var whitelist = ['http://localhost:8000', 'chrome-extension://aicmkgpgakddgnaphhhpliifpcfhicfo','*'];
var corsOptions = {
  origin: function(origin, callback){
    console.log("inside origin " + origin); 
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

//defining router
var brotherAPI = express.Router();
//adding body parser to express
brotherAPI.use(bodyParser.json());

//middleweare
brotherAPI.use(function (req, res, next) {
  console.log('Time:', Date.now())
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next()
});


//replace with db
var brothers = [];


brotherAPI.get('/getAll',cors(corsOptions), function(req, res){
    
    brothers = [{name: 'Sebastian Wright', location: "London", picLocation: '../../../../imgs/prophecy.jpg'},{name: 'Christopher Barrios', location: "USA", picLocation: '../../../../imgs/baldomero.jpg'},{name:'Kevin Chow', location: "Rome", picLocation: '../../../../imgs/absoluto.jpg'},
                    {name:'Josue Marrero', location: "London", picLocation: '../../../../imgs/inquiridor.jpg'},{name: 'Juan Garcia', location: "USA", picLocation: '../../../../imgs/diligencio.jpg'},{name: 'Eddy Hiraldo', location: "Mexico", picLocation: '../../../../imgs/jevi.jpg'},
                    {name: 'Jose Prado', location: "London", picLocation: '../../../../imgs/titus.jpg'},{name: 'Isaac Prado', location: "USA", picLocation: '../../../../imgs/theseus.jpg'},{name: 'Juanluis Giudicelli-Ortiz', location: "Mexico", picLocation: '../../../../imgs/leonidas.jpg'}]

    //returning brothers
    res.send({data: brothers});  
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});


//Method:POST
//	adding Student
/*brotherAPI.post('/addStudent/', function(req, res){

	var student = req.body;
	//if(student.i)
	Students.push(student);
    console.log(JSON.stringify(student) + Students.length);      // your JSON
	res.send(req.body);
   
});


//Method:GET
//	getting user by id
brotherAPI.get('/getStudentByID/:id', function(req, res){
    var id = req.params.id;
    
    if(id){
    	if(Students.length > 0){
    		var student;
    		Students.forEach(function (element, index, array) {
    			if(element.id == id)
			  		student =  element;
			});
			if(student)
    			res.send(student);	
    		else{
    			res.status(401);
        		res.json({message: "Student not found"});	
    		}
    	}else{
    		res.status(401);
        	res.json({message: "Students is empty"});	
    	}
    }else{
    	res.status(400);
        res.json({message: "Bad Request"});
    }
});

//Method:PUT
//	updating user by ID
brotherAPI.put('/updateStudentByID/:id', function(req, res){
    var id = req.params.id;
    
    if(id){
    	if(Students.length > 0){
    		var student;
    		Students.forEach(function (element, index, array) {
    			if(element.id == id){
    				student = req.body;
    				Students[index] =  student;
    			}
			});
			if(student)
    			res.send(student);	
    		else{
    			res.status(401);
        		res.json({message: "Student not found"});	
    		}
    	}else{
    		res.status(401);
        	res.json({message: "Students is empty"});	
    	}
    }else{
    	res.status(400);
        res.json({message: "Bad Request"});
    }
});

//Method:DELETE
//	deleting user by ID
brotherAPI.delete('/deleteStudentByID/:id', function(req, res){
    var id = req.params.id;
   	if(id){
    	if(Students.length > 0){
    		var found = false;
    		Students.forEach(function (element, index, array) {
    			if(element.id == id){
    				array.splice(index, 1);
    				found = true;
    			}
			});
			if(found)
    			res.json({message: "User deleted"});	
    		else{
    			res.status(401);
        		res.json({message: "Student not found"});	
    		}
    	}else{
    		res.status(401);
        	res.json({message: "Students is empty"});	
    	}
    }else{
    	res.status(400);
        res.json({message: "Bad Request"});
    }        
});*/

//export this router to use in our app.js
module.exports = brotherAPI;