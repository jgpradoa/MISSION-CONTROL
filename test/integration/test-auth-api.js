var request = require('supertest');
var express = require('express');
var assert = require('assert');
//config 
var config = require('../../config/main');
//mocking the following classes
var mongoDB = require('../../db/mongoDB');
var dbModels = require('../../models/index');

//changing port for testing
config.port = 8080;
//turning logger off
config.loggerON = false;

describe('testing login', function() {

	before(function() {
		mongoDB.mongoDB = function(){ };
		mongoDB.close = function(cb){
			cb(null);
		}
		//mocking Brother constructor
		dbModels.Brother = function(fields){ };
		//mocking User constructor
		dbModels.User = function (fields) { };
    });

    it('testing success login', function(done) {
    	var fakeBrother = {
    		_id: "031df6972f1f9c6c64c3515f",
		    firstName: "Test",
		    lastName: "God",
		    email: "test_God@lamkb.io",
		    hours: 2,
		    picture: "../../../../imgs/TGod.jpg",
		    __v: 0
    	};

    	var fakeUser = {
		    _id: "031df6972f1f9c6c64c3515f",
		    brother_id: "031df6972f1f9c6c64c3515f",
		    psw: "123456",
		    __v: 0
		};

		dbModels.Brother.prototype.findOneBy = function(query, cb){
			cb(null,fakeBrother);
		};

		dbModels.User.prototype.logIn = function(query, cb){
			cb(null,fakeUser);
		};
		
		var app = require('../../app');

		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io', password: 123456})
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		  	console.log(response.body.brother.firstName);
		    assert.ok(response.body.brother.email === 'test_God@lamkb.io', 'email');
		    assert.ok(response.body.brother.firstName === 'Test', 'first name');
		    assert.ok(response.body.brother.lastName === 'God', 'last name');
		    assert.ok(response.body.brother.hours === 2, 'hours');
		    assert.ok(response.body.brother.picture === '../../../../imgs/TGod.jpg', 'picture');
		    assert(response.body.token, 'token');

		    return done();
		});
    });

    it('testing invalid email', function(done) {
    	dbModels.Brother.prototype.findOneBy = function(query, cb){
			cb(null,null);
		};

		dbModels.User.prototype.logIn = function(query, cb){
			cb(null,null);
		};

    	var app = require('../../app');

		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io', password: 1234526})
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'Wrong user or password', 'message');
		    return done();
		});
    });

    it('testing invalid password', function(done) {
    	var fakeBrother = {
    		_id: "031df6972f1f9c6c64c3515f",
		    firstName: "Test",
		    lastName: "God",
		    email: "test_God@lamkb.io",
		    hours: 2,
		    picture: "../../../../imgs/TGod.jpg",
		    __v: 0
    	};
    	dbModels.Brother.prototype.findOneBy = function(query, cb){
			cb(null,fakeBrother);
		};

		dbModels.User.prototype.logIn = function(query, cb){
			cb(null,null);
		};
    	var app = require('../../app');
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io', password: 12345267})
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'Wrong user or password', 'message');
		    return done();
		});
    });

    it('testing invalid request -- missing username', function(done) {
    	var app = require('../../app');
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({password: 123456})
		  .expect(409)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'wrong request', 'message');
		    return done();
		});
    });

    it('testing invalid request -- missing password', function(done) {
    	var app = require('../../app');
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io'})
		  .expect(409)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'wrong request', 'message');
		    return done();
		});
    });
});	

describe('testing create User', function() {

	before(function() {
		mongoDB.mongoDB = function(){ };
		mongoDB.close = function(cb){
			cb(null);
		}
		//mocking Brother constructor
		dbModels.Brother = function(fields){ };
		//mocking User constructor
		dbModels.User = function (fields) { };
    });

});	

//TODO finish tests for create user