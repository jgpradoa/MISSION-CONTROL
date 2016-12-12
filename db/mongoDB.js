var mongoose = require('mongoose');
//config file
var config = require('../config/main');

var db;
exports.mongoDB = function() {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.mongoConnection);

	db = mongoose.connection;
	db.on('error', (err) => {
			console.log(err);
			throw 'could not connect to db';
	});
	db.once('open', function() {
		// we're connected!
		console.log("connected 2");
	});
    return db;
};

exports.close = function(cb){
	db.close((err) => {
      if (err) throw err;
      //return true and new brother
      console.log("db connection closed");
      cb(err)
    });
}

exports.mongoose = mongoose;