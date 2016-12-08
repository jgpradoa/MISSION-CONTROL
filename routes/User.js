var express = require('express');
var bodyParser = require('body-parser');
var User =  require('../models/User');
var ent = require('../utils').ent;
var utils = require('../utils').equals;
var Library =  require('../models/Library');
//JWT
var jwt = require('../utils').jwt;

//defining router
var userAPI = express.Router();
//adding body parser to express
userAPI.use(bodyParser.json());

userAPI.post('/updateLocation', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _brother = req.body.brother;    

    var _location = req.body.coord;
    
    if(!_brother || !_location){
        res.status(401).send("wrong request"); //change status
        return;
    }

    //check for user.name as well
    var user = req.user;
    if(user.brother.firstName != JSON.parse(_brother).firstName || user.brother.lastName != JSON.parse(_brother).lastName){
        console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    
    //get library based on coord
    
    var library;

    if(utils.equals({lat: 1.5,long: 0.2},JSON.parse(_location)))
        library = new Library({lat: 1.5,long: 0.2}, "Lib 1");
    else if(utils.equals({lat: 2.5,long: 2.2},JSON.parse(_location)))
        library = new Library({lat: 2.5,long: 2.2}, "Lib 2");
    else{
        res.status(401).send('could not find library with ' + _location);
        return;
    }
    //library
    console.log("library: " + JSON.stringify(library));
    
    // We are sending the profile inside the token 
    //To-do change to db
    user.brother.library = library;
    //returning updated user
    var token = jwt.create(user); // 60*5 minutes
    res.json({ token: token, user: user});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

userAPI.post('/updateName', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _brother = req.body.brother;
    var _fName = req.body.fName;
    var _lName = req.body.LName;
    
    if(!_brother || !_fName || !_lName){
        res.status(401).send("wrong request"); //change status
        return;
    }

    //check for user.name as well expection is admin
    var user = req.user;
    if(user.brother.firstName != JSON.parse(_brother).firstName || user.brother.lastName != JSON.parse(_brother).lastName){
        console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    user.brother.firstName = _fName;
    user.brother.lastName = _lName;

    //returning updated user
    var token = jwt.create(user); // 60*5 minutes
    res.json({ token: token, user: user});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

userAPI.post('/updatePicture', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _brother = req.body.brother;
    var _picture = req.body.picture;
    
    if(!_brother || !_picture){
        res.status(401).send("wrong request"); //change status
        return;
    }

    //check for user.name as well expection is admin
    var user = req.user;
    if(user.brother.firstName != JSON.parse(_brother).firstName || user.brother.lastName != JSON.parse(_brother).lastName){
        console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    user.brother.picture = _picture;

    //returning updated user
    var token = jwt.create(user); // 60*5 minutes
    res.json({ token: token, user: user});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

userAPI.post('/updatePassword', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _brother = req.body.brother;
    var _password = req.body.password;
    
    if(!_brother || !_password){
        res.status(401).send("wrong request"); //change status
        return;
    }

    //check for user.name as well expection is admin
    var user = req.user;
    if(user.brother.firstName != JSON.parse(_brother).firstName || user.brother.lastName != JSON.parse(_brother).lastName){
        console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    console.log("changed password to: " + _password);

    //returning updated user
    var token = jwt.create(user); // 60*5 minutes
    res.json({ token: token, user: user});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

userAPI.get('/myHours', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _email = req.query.email;
    
    if(!_email){
        res.status(401).send("wrong request"); //change status
        return;
    }

    //check for user.name as well expection is admin
    var user = req.user;
    if(user.email != _email){
        console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    var hours = [];
    
    hours.push({date: '08/31/1992', TotalHours: 8});
    hours.push({date: '08/31/1992', TotalHours: 8});
    hours.push({date: '08/31/1992', TotalHours: 8});

    console.log("changed password to: " + JSON.stringify(hours));

    //returning total hours
    res.json({ hours: hours});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

//export this router to use in our app.js
module.exports = userAPI;