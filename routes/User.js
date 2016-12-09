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

/*
//when user updates location check:
//    1)isInLibrary flag:
//        true: ignore
//        false: update time table with starting time
//            2) emit an event to add brother to the brothers_list 
//location not found 
//    1)isInLibrary flag:
//        true: update time table with stoping time 
//            2) emit an event to remove brother from the brothers_list 
//        false: ignore
*/

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
        //console.log("in error");
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
    //console.log("library: " + JSON.stringify(library));
    
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
       // console.log("in error");
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
        //console.log("in error");
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
        //console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    //console.log("changed password to: " + _password);

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
        //console.log("in error");
        res.status(401).send('wrong user!');
        return;
    }
    

    //To-do change to db
    var hours = [];
    
    hours.push({date: '08/31/1992', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
    hours.push({date: '08/31/1992', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
    hours.push({date: '08/31/1992', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});

    //console.log("changed password to: " + JSON.stringify(hours));

    //returning total hours
    res.json({ hours: hours});
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

userAPI.get('/myHoursFilterBy', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    var _email = req.query.email;
    var _type = req.query.type;

    //d: day, //w: week, //m:month , //y: year , c// custom
    switch(_type){
        case 'd': //get headers and call database here
            var _day = req.query.value;
            if(!_day){
                res.status(401).send("wrong request"); //change status
                return;
            }
            //console.log("day: " + _day);
            //To-do change to db
            var hours = [];            
            hours.push({date: '08/31/1992', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
            hours.push({date: '08/31/1992', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
            hours.push({date: '08/31/1992', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});
            res.json({ hours: hours});
            break;
        case 'w':
            var _startingDay = req.query.value;
            if(!_startingDay){
                res.status(401).send("wrong request"); //change status
                return;
            }
            var hours = [];            
            hours.push({date: '08/30/1992', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
            hours.push({date: '08/30/1992', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
            hours.push({date: '08/30/1992', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});
            //console.log("Starting Day: " + _startingDay);
            res.json({ hours: hours});
            break;
        case 'm':
            var _monthNo = req.query.value;
            if(!_monthNo){
                res.status(401).send("wrong request"); //change status
                return;
            }
            var hours = [];            
            hours.push({date: '09/31/1992', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
            hours.push({date: '09/31/1992', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
            hours.push({date: '09/31/1992', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});
            //console.log("month: " + _monthNo);
            res.json({ hours: hours});
            break;
        case 'y':
            var _year = req.query.value;
            if(!_year){
                res.status(401).send("wrong request"); //change status
                return;
            }
            var hours = [];            
            hours.push({date: '08/31/2016', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
            hours.push({date: '08/31/2016', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
            hours.push({date: '08/31/2016', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});
            //console.log("year: " + _year);
            res.json({ hours: hours});
            return;
        case 'c':
            var _from = req.query.from;
            var _to = req.query.to;
            if(!_from || !_to){
                res.status(401).send("wrong request"); //change status
                return;
            }
            var hours = [];            
            hours.push({date: '08/31/2016', TotalHours: 2, library: {coordinates: {lat: 0, long: 1}, name: 'Marston'}});
            hours.push({date: '09/31/2016', TotalHours: 1, library: {coordinates: {lat: 0, long: 1}, name: 'West'}});
            hours.push({date: '10/31/2016', TotalHours: 4, library: {coordinates: {lat: 0, long: 1}, name: 'turl'}});
            //console.log("custom from " + _from + " to " + _to);
            res.json({ hours: hours});
            return;
        default:
            res.status(401).send("wrong request"); //change status
    };

    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

//export this router to use in our app.js
module.exports = userAPI;
