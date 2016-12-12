var express = require('express');
var bodyParser = require("body-parser");
//JWT
var jwt = require('../utils').jwt;

//user
var User = require('../models/User');
var Brother =  require('../models/Brother');

//db
var mongoDB = require('../db/mongoDB').mongoDB;

//defining router
var authAPI = express.Router();
//adding body parser to express
authAPI.use(bodyParser.json());
authAPI.use(bodyParser.urlencoded({ extended: true }));


//Method:POST
//	authenticating user
// returns a json token and the user with roles
authAPI.post('/login', function (req, res) {
  var _email = req.body.email;
  var _password = req.body.password;
  if(!(_email && _password)){
    res.status(409).send({ error: 'wrong request'}); //change status
    return;
  }

  //start db 
  var db = new mongoDB();

  //findOneBy
  var brother = new Brother({email: _email});

  brother.findOneBy({email: _email}, (err, _brother) => {
    if(err){
      throw err;
    }

    if(_brother){
      var user = new User({brother_id: _brother._id});  
      user.logIn({brother_id: _brother._id, psw: _password}, (err, user) => {
        if(err){
          db.close();
          throw err;
        }

        if(user){
          db.close();
          var token = jwt.create(_brother); // 60*5 minutes
          res.json({ token: token, brother: _brother});
        }else{
          db.close();
          res.status(401).json({ error: 'Wrong user or password'});   
        }
      });
    }else{
      db.close();
      res.status(401).json({ error: 'Wrong user or password'});
      return;
    }

  });
});

authAPI.post('/createUser', function(req,res){
  //start db 
  var db = new mongoDB();

  var _brother = req.body.brother;
  var _password = req.body.password; //has to be hashed

  var brother = new Brother(_brother);

  brother.exist(_brother.email, (err, _brother) => {
    if(err){
      db.close();
      throw err;
    }
    
    if(_brother){
      var user = new User({brother_id: _brother._id, psw: _password});
      user.exist(_brother._id , (err, _user) => {
        if(err){
          db.close();
          throw err;
        }
        if(_user){
            res.status(409).send({ error:'User already exists'}); //change status
            return;
        }else{
          user.save((err, _user) => {
            if(err){
              db.close();
              throw err; //remove brother from db then throw err
            }
            
            db.close();
            res.json({ saved: 'true', brother: brother});
          });
        }
      }); //end of user exist
    }else{
      brother.save((err, _brother) => {
        if (err) {
          db.close();
          throw err;
        }

        var user = new User({brother_id: _brother._id, psw: _password});

        user.save((err, user) => {
          if(err){
            db.close();
            throw err; //remove brother from db then throw err
          }
          
          db.close();
          res.json({ saved: 'true', brother: brother});
        });// end of user save
      });//end of brother save
    }
  });
});

//export this router to use in our app.js
module.exports = authAPI;