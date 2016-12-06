//Brothers
var brother = require('./Brother');

var bros = [];

var Brothers = function () {
	console.log("hi");
  bros.push(new brother('Sebastian','Wright', {coordinates: {lat: 0, long: 1}, name: 'Marston'}, 2, '../../../../imgs/prophecy.jpg')); //firstName, lastName, library, hours, Picture
  bros.push(new brother('Christopher','Barrios', {coordinates: {lat: 0, long: 1}, name: 'Marston'}, 2, '../../../../imgs/baldomero.jpg'));
  bros.push(new brother('Kevin','Chow', {coordinates: {lat: 0, long: 2}, name: 'Lib 2'}, 2, '../../../../imgs/absoluto.jpg'));
  bros.push(new brother('Josue','Marrero', {coordinates: {lat: 0, long: 2}, name: 'Lib 2'}, 2, '../../../../imgs/inquiridor.jpg'));
  bros.push(new brother('Juan','Garcia', {coordinates: {lat: 0, long: 3}, name: 'Lib 3'}, 2, '../../../../imgs/diligencio.jpg'));
  bros.push(new brother('Eddy','Hiraldo', {coordinates: {lat: 0, long: 3}, name: 'Lib 3'}, 2, '../../../../imgs/jevi.jpg'));
  bros.push(new brother('Jose','Prado', {coordinates: {lat: 0, long: 4}, name: 'Lib 4'}, 2, '../../../../imgs/titus.jpg'));
  bros.push(new brother('Isaac','Prado', {coordinates: {lat: 0, long: 4}, name: 'Lib 4'}, 2, '../../../../imgs/theseus.jpg'));
  bros.push(new brother('Juanluis','Giudicelli-Ortiz', {coordinates: {lat: 0, long: 5}, name: 'Lib 5'}, 2, '../../../../imgs/leonidas.jpg'));
  console.log("bros: " + JSON.stringify(bros));
  this.brothers = bros;
  console.log("bros: " + JSON.stringify(this.brothers));
  return bros;
};

Brothers.prototype.getBrothers = function(){
	return this.brothers;
};

Brothers.prototype.setBrothers = function(brothers){
	this.brothers = brothers;
};

Brothers.prototype.getBrothersContaining = function(keywords){
	//bro array
	var bros = []

	//getting brothers with keywords
	this.brothers.forEach((bro, index, array) => {
		if(this.bro.contains(keywords)){
			bros.push(bro);
		}
	});

	return bros;
};

Brothers.prototype.getBrothersByLibrary = function(library){
	//bro array
	var bros = []

	//getting brothers with keywords
	this.brothers.forEach((bro, index, array) => {
		if(this.bro.sameLibrary(library)){
			bros.push(bro);
		}
	});

	return bros;	
};

//getBrothersContaining , getBrothersByLibrary 

module.exports = Brothers;