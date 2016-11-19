var express = require('express');
var bodyParser = require("body-parser");

//defining router
var apiRouter = express.Router();
//adding body parser to express
apiRouter.use(bodyParser.json());

var Students = [];

var Student = function(id, fName, lName) {
    this.id = id; 
    this.fName = fName;
    this.lName = lName;
};



apiRouter.get('/getAll', function(req, res){
    
    var brothers = [];
    brothers.push({id: 1,  fName: "Jose",  lName: "Prado"});
    brothers.push({id: 1,  fName: "Memo",  lName: "Prado"});
    brothers.push({id: 1,  fName: "Guillermo",  lName: "Prado"});

    //returning brothers
    res.send(brothers);  
    
});


//Method:POST
//	adding Student
apiRouter.post('/addStudent/', function(req, res){

	var student = req.body;
	//if(student.i)
	Students.push(student);
    console.log(JSON.stringify(student) + Students.length);      // your JSON
	res.send(req.body);
   
});


//Method:GET
//	getting user by id
apiRouter.get('/getStudentByID/:id', function(req, res){
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
apiRouter.put('/updateStudentByID/:id', function(req, res){
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
apiRouter.delete('/deleteStudentByID/:id', function(req, res){
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
});

//export this router to use in our app.js
module.exports = apiRouter;