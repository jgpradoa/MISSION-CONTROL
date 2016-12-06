//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var brother = require('./Brother');

var User = function (brother, role) {
  this.brother = (brother? brother : "");
  this.roles = (role? role : "");
};

User.prototype.updateBrother = function(brother) {
	//add time stamp in db
	this.brother = brother;
};

User.prototype.getBrother = function() {
	//add time stamp in db
	return this.brother;
};

User.prototype.getRoles = function(){
	return this.roles;
};

User.prototype.updateRoles = function(role){
	this.roles = role;
};

module.exports = User;