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

JWTSchema.methods.create = function(brother){
	this.auth_token = utils.jwt.create(brother); // 60*5 minutes
	this.token_TS = Date.now();
	return this.auth_token;
};

JWTSchema.methods.exist = function(cb){

	this.model('JWT').findOne({ brother_id: this.brother_id, auth_token: this.auth_token }, cb);
};

JWTSchema.methods.logOut = function(_id, cb){
	
	/*var brother = new Brother({email: email});
	var broCursor = Brother.find({ email: email }).cursor();
	var searchedFinished = false;
	broCursor.on('data', function(bro) {
	  if(searchedFinished){
	  	console.log('block accounts');
	  	return;
	  }
	  //cursing through Brothers --change to find 
	  mongoDB.mongoose.model('User', UserSchema).findOne({ brother_id: bro._id }, (err, user) => {
	  	console.log('user: ' + user);
	  	if(user.psw === pasw){
	  		searchedFinished = true;
	  		var token = utils.jwt.create(brother); // 60*5 minutes
	  		user.auth_token = token;

			// save the user
		  	\mongoDB.close((_err) => {
	  			console.log(bro);
	            cb(_err,{ token: token, brother: bro});
	        });
	  		
	  	}else{
	  		mongoDB.close((_err) => {
	  			console.log(bro);
	            cb(_err,null);
	        });
	  	}

	  });
	});

	broCursor.on('end', function() {
		console.log('called end');
	});*/
};

// creating actual model
var JWT = mongoDB.mongoose.model('JWT', JWTSchema);

//exporting model
module.exports = JWT;


//ToDo add roles here