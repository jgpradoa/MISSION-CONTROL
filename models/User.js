//encryptor 
//const var bcrypt = require('bcrypt-nodejs');

var Brother = require('../models/Brother');
var JWT = require('../models/JWT');

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

UserSchema.methods.logIn = function(email, psw, cb){
	//start db 
  	var db = new mongoDB.mongoDB();
	
	//creating brother cursor
	Brother.findOne({ email: email }, function(error, bro) {
		if(!bro){
			//email didn't match
	  		mongoDB.close((_err) => {
		    	//add logger
		    	console.log(_err);
		    	cb('Wrong user or password',null);
			});
			return;
	  	}
	  //finding brother in user's table 
	  mongoDB.mongoose.model('User', UserSchema).findOne({ brother_id: bro._id }, (err, user) => {
	  	
	  	//checking if psw is correct
	  	if(user.psw === psw){
	  		//create JWT
	  		var jwt = new JWT({brother_id: user.brother_id});
	  		//creating and storing token in JWT
	  		jwt.logIn(bro,function(err) {
	  			//returning error, token and brother
				mongoDB.close((_err) => {
			    	//add logger
			    	console.log(_err);
			    	cb(err,{ token: jwt.auth_token, brother: bro});
				});
			});
	  	}else{
	  		//psws didn't match
	  		mongoDB.close((_err) => {
		    	//add logger
		    	console.log(_err);
		    	cb('Wrong user or password',null);
			});
	  	}

	  }); // end of user 
	});//en of on data 


};

//
UserSchema.methods.logOut = function(brother_id, cb){
	var jwt = new JWT(brother_id);
	return jwt.logOut(brother_id,(err) => {
		cb(err);
	});
};


// creating actual model
var User = mongoDB.mongoose.model('User', UserSchema);

//exporting model
module.exports = User;


//ToDo add roles here --rename to auth