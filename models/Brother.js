//encryptor 
//const var bcrypt = require('bcrypt-nodejs');
var Library = require('./Library');

var Brother = function (firstName, lastName, library, hours, picture) {
	console.log("here 2")

	this.firstName = "";
	this.lastName = "";
	this.library = null;
	this.hours = "";
	this.picture =  "../../../../imgs/user.jpg";
	return this;
	 //

  /*this.firstName = (firstName? firstName: "");
  this.lastName = (lastName? lastName : "");
  this.library = (library? library : "");
  this.hours = (hours? hours : "");
  this.picture = (picture? picture : "../../../../imgs/user.jpg"); //*/
};

//get Library
Brother.prototype.getLibrary = function() {
	//add time stamp in db
	return this.library;
};

//set library
Brother.prototype.updateLibrary = function(newLibrary) {
	//add time stamp in db
	this.library = newLibrary;
};

//get last name
Brother.prototype.getLasttName = function(){
	return this.lastName;
};

//set last name
Brother.prototype.updateLastName = function(lastName){
	this.lastName = lastName;
};

//get first name
Brother.prototype.getFirstName = function(firstName){
	this.firstName = firstName;
};
//set first name
Brother.prototype.updateFirstName = function(){
	return this.firstName;
};

//get hours
Brother.prototype.getHours = function(hours){
	this.hours = hours;
};
//set hours
Brother.prototype.updateHours = function(){
	return this.hours;
};

//comparing library
Brother.prototype.sameLibrary = function(library){
	return library.equals(library);
};

//set picture
Brother.prototype.updatePicture = function(){
	return this.picture;
};

//get picture
Brother.prototype.getPicture = function(picture){
	return picture = picture;
};


Brother.prototype.equals = function(bro){
	
	if(this.firstName === bro.firstName && this.lastName === bro.lastName && this.hours === bro.hours && this.hours === bro.hours && this.picture === picture && library.equals(library))
		return true;
	else
		return false;
};


module.exports = Brother;