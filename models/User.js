//encryptor 
//const var bcrypt = require('bcrypt-nodejs');

var Brother = require('./Brother');
var JWT = require('./JWT');

var mongoDB = require('../db/mongoDB');
var Schema = mongoDB.mongoose.Schema;

// create the brother schema 
var UserSchema = new Schema({
  brother_id: String,
  psw: String,
  auth_token: String,
  token_TS: Date
});


UserSchema.methods.exist = function(_id, cb){

	this.model('User').findOne({ brother_id: _id }, cb);
};

UserSchema.methods.isLoggedIn = function(_id, _tkn, cb){
	var jwt = new JWT({brother_id: _id, auth_token : _tkn});
	return jwt.exist(cb);
};

UserSchema.methods.logIn = function(email, pasw, cb){
	var brother = new Brother({email: email});
	var broCursor = Brother.find({ email: email }).cursor();
	var searchedFinished = false;
	broCursor.on('data', function(bro) {
	  if(searchedFinished){
	  	console.log('block accounts');
	  	return;
	  }
	  //cursing through Brothers --change to find 
	  mongoDB.mongoose.model('User', UserSchema).findOne({ brother_id: bro._id }, (err, user) => {
	  	if(user.psw === pasw){
	  		searchedFinished = true;
	  		//create JWT
	  		var jwt = new JWT({brother_id: user.brother_id});
	  		jwt.create(bro);
	  		// save the JWT
		  	jwt.save(function(err) {
		    	if (err) cb(_err,null);
			    mongoDB.close((_err) => {
		            cb(_err,{ token: jwt.auth_token, brother: bro});
		        });
			});
	  		
	  	}else{
	  		mongoDB.close((_err) => {
	            cb(_err,null);
	        });
	  	}

	  });
	});
};

// creating actual model
var User = mongoDB.mongoose.model('User', UserSchema);

//exporting model
module.exports = User;


//ToDo add roles here