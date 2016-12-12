//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var utils = require('../utils').equals;

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