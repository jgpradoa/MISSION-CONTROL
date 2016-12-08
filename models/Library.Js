//library //compare coord
var utils = require('../utils').equals;

//encryptor 
//const var bcrypt = require('bcrypt-nodejs');

var Library = function (coordinates, name) {
  this.coordinates = (coordinates? coordinates: "");
  this.name = (name? name : "");
};

//get coordinates
Library.prototype.getCoordinates = function() {
	//add time stamp in db
	return this.coordinates;
};

//set coordinates
Library.prototype.updateCoordinates= function(coordinates) {
	//add time stamp in db
	this.coordinates = coordinates;
};

//get name
Library.prototype.getName = function(){
	return this.name;
};

//set name
Library.prototype.updateName = function(name){
	this.name = name;
};

//comparing Location
Library.prototype.compareLocation = function(coordinates){
	return utils.equals(this,coordinates);
}

module.exports = Library;