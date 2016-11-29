//encryptor 
const var bcrypt = require('bcrypt-nodejs');

//config file
var config = require('../config/main');

const var Brother = function (firstName, lastName, email, password, role, resetPasswordToken, resetPasswordExpires) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
  this.role = role;
  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpires = resetPasswordExpires;
};

Brother.prototype.save = function(next) {
	bcrypt.genSalt(config.SALT_FACTOR, function(err, salt) {
	    if (err) 
	    console.log("1 error inside genSalt" + JSON.stringify(error));  //change to return error

	    bcrypt.hash(this.password, salt, null, function(err, hash) {
		    if (err) 
		    	console.log("1 error inside genSalt" + JSON.stringify(error));  //change to return error
		    else{
		    	this.password = hash;
		      	console.log("done pass: " + this.password);
		   	}
	   		next();
	    });
	});
};

Brother.prototype.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = Brother;