var express = require('express');
var bodyParser = require('body-parser');
var Brothers =  require('../models/Brothers');
var ent = require('../utils').ent;

//defining router
var brothersAPI = express.Router();
//adding body parser to express
brothersAPI.use(bodyParser.json());

//replace with db
var brothers = [];

brothersAPI.get('/getAll', function(req, res){
    //console.log("perm " + JSON.stringify(req.user));
    if(!ent.entValidation(['admin','regular'],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }

    this.brothers = Brothers();
    res.send({data: this.brothers}); 
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

brothersAPI.get('/filterByBro', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }
    var _name = req.query.name;
    if(!_name){
        res.status(401).send("wrong request"); //change status
    }

    //console.log("filter: " + JSON.stringify(this.brothers));
    var newBrothers = [];
    var i;
    for (i = 0; i < this.brothers.length; i++){
        var combined = this.brothers[i].firstName + " " +  this.brothers[i].lastName;
        if(combined.toLowerCase().includes(_name.toLowerCase()))
            newBrothers.push(this.brothers[i]);
    }
    
    
    //returning new Brothers
    res.send({data: newBrothers}); 
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

brothersAPI.get('/filterByLib', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }
    var _name = req.query.libName;
    if(!_name){
        res.status(401).send("wrong request"); //change status
    }

    //console.log("filter: " + JSON.stringify(this.brothers));
    var newBrothers = [];
    var i;
    for (i = 0; i < this.brothers.length; i++){
        var libName = this.brothers[i].library.name;
        if(libName.toLowerCase().includes(_name.toLowerCase()))
            newBrothers.push(this.brothers[i]);
    }
    
    
    //returning new Brothers
    res.send({data: newBrothers}); 
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});

brothersAPI.get('/filterByAll/broName/:broName/libName/:libName', function(req, res){

    if(!ent.entValidation(["admin","regular"],req.user.roles)){
        res.status(401).send('insufficient permissions');
    }
    var _broName = req.params.broName;
    var _libName = req.params.libName;
    if(!_libName || !_broName){
        res.status(401).send("wrong request"); //change status
    }

    //console.log("filter: " + JSON.stringify(this.brothers));
    var newBrothers = [];
    var i;
    for (i = 0; i < this.brothers.length; i++){
        var libName = this.brothers[i].library.name;
        var combined = this.brothers[i].firstName + " " +  this.brothers[i].lastName;
        var bro = combined.toLowerCase().includes(_broName.toLowerCase());
        var lib = libName.toLowerCase().includes(_libName.toLowerCase());
        if(bro || lib)
            newBrothers.push(this.brothers[i]);
    }
    
    
    //returning new Brothers
    res.send({data: newBrothers}); 
    //error msg
    //res.status(500).send({ error: 'database is down! Please try again later.' });
});



//export this router to use in our app.js
module.exports = brothersAPI;