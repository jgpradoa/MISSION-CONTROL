//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var utils = require('../utils');

var mongoDB = require('../db/mongoDB');
var Schema = mongoDB.mongoose.Schema;

// create the JWT schema 
var JWTSchema = new Schema({
  brother_id: String,
  auth_token: String,
  token_TS: Date
});

JWTSchema.methods.logIn = function(brother, cb){
	this.auth_token = utils.jwt.create(brother); // 60*5 minutes
	this.token_TS = Date.now();
	this.brother_id = brother._id;
	this.save(function(err) {
    	cb(err);
  	});
};

JWTSchema.methods.exist = function(cb){

	this.model('JWT').findOne({ brother_id: this.brother_id, auth_token: this.auth_token }, cb);
};

JWTSchema.methods.logOut = function(_id, cb){
	
	this.model('JWT').findOneAndRemove({ brother_id: _id }, function(err) {
	  	cb(err);
	});
};

// creating actual model
var JWT = mongoDB.mongoose.model('JWT', JWTSchema);

//exporting model
module.exports = JWT;


//ToDo add roles here