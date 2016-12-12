//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var utils = require('../utils').equals;

var mongoose = require('../db/mongoDB').mongoose;
var Schema = mongoose.Schema;

// create the brother schema 
var UserSchema = new Schema({
  brother_id: String,
  psw: String,
  salt: String,
  auth_token: String,
  token_TS: Date
});


UserSchema.methods.exist = function(_id, cb){

	this.model('User').findOne({ brother_id: _id }, cb);
};

UserSchema.methods.logIn = function(query, cb){

	this.model('User').findOne(query, cb);
};

// creating actual model
var Brother = mongoose.model('User', UserSchema);

//exporting model
module.exports = Brother;


//ToDo add roles here