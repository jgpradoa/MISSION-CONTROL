//Coordinates
var equals = require('../utils').equals;

//encryptor 
//const var bcrypt = require('bcrypt-nodejs');

var Coordinates = function (lat, long) {
  this.lat = (lat? lat: "");
  this.long = (long? long : "");
};

//get Lat
Coordinates.prototype.getLat = function() {
	//add time stamp in db
	return this.lat;
};

//set Lat
Coordinates.prototype.updateLat= function(lat) {
	//add time stamp in db
	this.lat = lat;
};

//get Long
Coordinates.prototype.getLong = function(){
	return this.long;
};

//set Long
Coordinates.prototype.updateLong = function(long){
	this.long = long;
};

module.exports = Coordinates;