//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var utils = require('../utils').equals;
//db
var mongoDB = require('../db/mongoDB');
var User = require('../models/index').User;

var mongoose = require('../db/mongoDB').mongoose;
var Schema = mongoose.Schema;

// create the brother schema 
var brotherSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  hours: Number,
  picture: String,
  created_at: Date,
  updated_at: Date
});


brotherSchema.methods.sameLibrary = function(library){
	return utils.equals(library);
};

brotherSchema.methods.exist = function(email, cb){

	this.model('Brother').findOne({ email: email }, cb);
};

brotherSchema.methods.findOneBy = function(query, cb){

	this.model('Brother').findOne(query, cb);
};

brotherSchema.methods.createBrother = function(brother, _password, cb){

	brother.save((err, _brother) => {
        if(err){
          	mongoDB.close((_err) => {
            	if(_err)
              		throw _err;
            	if(err)
              		throw err;
          	});
        }

        cb(err, _brother);
  
    });//end of brother save
};

// creating actual model
var Brother = mongoose.model('Brother', brotherSchema);

//exporting model
module.exports = Brother;



/*
Usage:
	var brother = new Brother({ firstName: 'Jose', lastName: 'Prado', email: 'yo@lamkb.io', hours: 5 });

	brother.save(function (err, brother) {
	  if (err) throw err;
	  console.log(brother);
	  //return true and new brother
	});
	
	//returns all
	brother.find(function (err, brother) {
	  if (err) throw err;
	  console.log(brother);
	})

	brother.find({ name: 'jose' }, callback);

	brother.findOneAndUpdate({'email' : 'yo@lamkb.io'}, { $set: { created_at: 'DATE_HERE' }}, { new: true }, function (err, brother) {
	  if (err) throw err;
	  console.log(brother);
	  
	});

	brother.findOneAndRemove({'email' : 'yo@lamkb.io'}, function (err,offer){
        if (err) throw err;
		console.log(brother);
    });
*/