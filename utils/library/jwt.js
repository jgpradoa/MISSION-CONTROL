//JWT
var jwt = require('jsonwebtoken');
//config file
var config = require('../../config/main');

var exports = module.exports = {};

exports.create = function(user){
	if(!user)
		return "no user";

	var token = jwt.sign(user, config.secret, { expiresIn: 1800 }); // 60*5 minutes
	return token;
}