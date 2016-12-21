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
	
	//creating brother to 
	var brother = new Brother({email: email});
	//creating brother cursor
	var broCursor = Brother.find({ email: email }).cursor();
	//flag to check if we have multiple users
	var searchedFinished = false;

	//calling this when we find a brother with that e-mail
	broCursor.on('data', function(bro) {
		//return error if we have multiple bros with the same e-mail
		if(searchedFinished){
			console.log('block accounts');
			return;
		}

	  //finding brother in user's table 
	  mongoDB.mongoose.model('User', UserSchema).findOne({ brother_id: bro._id }, (err, user) => {
	  	//checking if psw is correct
	  	if(user.psw === psw){
	  		//setting flag true
	  		searchedFinished = true;
	  		//create JWT
	  		var jwt = new JWT({brother_id: user.brother_id});
	  		//creating and storing token in JWT
	  		jwt.logIn(bro,function(err) {
		    	//closing db
			    mongoDB.close((_err) => {
			    	//add logger
			    	if(_err)
			    		cb(_err,{ token: jwt.auth_token, brother: bro});
			    	else	
		            	cb(err,{ token: jwt.auth_token, brother: bro});
		        });
			});
	  	}else{
	  		mongoDB.close((_err) => {
	  			if(_err)
	            	cb(_err,null);
	            else
	            	cb({msg: 'Wrong user or password'},null);
	        });
	  	}

	  });
	});
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