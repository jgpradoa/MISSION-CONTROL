var request = require('supertest');
var express = require('express');
var assert = require('assert');
//authAPI
var authAPI = require('../../routes/Auth'); 
//config 
var config = require('../../config/main');

//changing port for testing
config.port = 8080;
//turning logger off
config.loggerON = false;

var app = require('../../app');

describe('testing login', function() {
    it('testing success login', function(done) {
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io', password: 123456})
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.brother.email === 'yo@lamkb.io', 'email');
		    assert.ok(response.body.brother.firstName === 'Jose', 'first name');
		    assert.ok(response.body.brother.lastName === 'Prado', 'last name');
		    assert.ok(response.body.brother.hours === 2, 'hours');
		    assert.ok(response.body.brother.picture === '../../../../imgs/titus.jpg', 'picture');
		    assert(response.body.token, 'token');

		    return done();
		});
    });

    it('testing invalid login', function(done) {
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

    it('testing invalid request -- missing username', function(done) {
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({password: 123456})
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'wrong request', 'message');
		    return done();
		});
    });

    it('testing invalid request -- missing password', function(done) {
		request(app)
		  .post('/api/auth/login')
		  .set('Content-Type', 'application/json')
		  .send({email : 'yo@lamkb.io'})
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    assert.ok(response.body.error === 'wrong request', 'message');
		    return done();
		});
    });
});	

//TODO add test for couldn't find user in the db