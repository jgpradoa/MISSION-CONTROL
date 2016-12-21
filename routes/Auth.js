var express = require('express');
var bodyParser = require("body-parser");

//user
var User = require('../models/index').User;
var Brother =  require('../models/index').Brother;

//db
var mongoDB = require('../db/mongoDB');

//defining router
var authAPI = express.Router();
//adding body parser to express
authAPI.use(bodyParser.json());
authAPI.use(bodyParser.urlencoded({ extended: true }));


//Method:POST
//	authenticating user
// returns a json token and the user with roles
authAPI.post('/login',(req, res) => {
  //checking param
  var _email = req.body.email;
  var _password = req.body.password;
  if(!(_email && _password)){
    res.status(400).send({ error: 'wrong request'});
    return;
  }
  
  //creating user obj to check credentials
  var user = new User({});  
  user.logIn(_email,_password, (err,user) => {
    if(err){ //including not found
      res.status(401).json({ error: err});
    }else{
        //user has token and user id
        res.json(user);
    }
  });

});

authAPI.get('/loggedIn',(req, res) =>{
  User.isLoggedIn(req.brother._id, req.headers.authorization.split(' ')[1], (err,loggedIn) =>{
    if(err){
      res.status(401).json({ error: err});
    }else{
      if(loggedIn){
        res.json({loggedIn: true});
      }else{
        res.status(401).send({ error:'Not loggedIn'});
      }
    }
  });//isLoggedIn = function(_id, _tkn, cb){

});

//logOut
authAPI.post('/logout',(req, res) =>{ 
  console.log('brother: ' + req.brother._id);
  var _id = req.body.brother_id;
  if(!_id)
    res.status(409).send({ error: 'wrong request'}); //change status

  User.logOut(_id, (err) => {
    if(err)
      res.status(401).json({ error: err});

    res.json({loggedOut: true});
  });

});

//TODO clean this up
authAPI.post('/createUser',(req,res) =>{

  //add middleware for role authorization

  //start db 
  var db = new mongoDB.mongoDB();

  var _brother = req.body.brother;
  var _password = req.body.password; //has to be hashed

  var brother = new Brother(_brother);

  //checking if it is already a member
  brother.exist(_brother.email, (err, _brother) => {
    if(err){
      mongoDB.close((_err) => {
        if(_err)
          throw _err;
        if(err)
          throw err;
      });
    }
    
    //if brother found -> check if it is linked to a user
    if(_brother){
      var user = new User({brother_id: _brother._id, psw: _password});

      //checking if user exists
      user.exist(_brother._id , (err, _user) => {
        if(err){
          mongoDB.close((_err) => {
            if(_err)
              throw _err;
            if(err)
              throw err;
          });
        }

        //if user found 
        if(_user){
          mongoDB.close((_err) => {
            if(_err)
              throw _err;
            

          });
        }else{
          user.save((err, _user) => {
            if(err){
              mongoDB.close((_err) => {
                if(_err)
                  throw _err;
                if(err)
                  throw err;
              });
            }
            
            mongoDB.close((_err) => {
              if(_err)
                throw _err;
              
              res.json({ saved: 'true', brother: brother});
            });
          });
        }
      }); //end of user exist
    }else{
      brother.createBrother(brother,_password, (err,brother) =>{
        if(err){
          mongoDB.close((_err) => {
            if(_err)
              throw _err;
            if(err)
              throw err;
          });
        }
          
        mongoDB.close((_err) => {
          if(_err)
            throw _err;
          res.json({ saved: 'true', brother: brother});
        });
      });
    }
  });
});

//export this router to use in our app.js
module.exports = authAPI;