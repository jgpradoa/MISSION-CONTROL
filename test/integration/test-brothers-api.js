var request = require('supertest');
var express = require('express');
var assert = require('assert');
//authAPI
var authAPI = require('../../routes/Auth'); 
//config 
var config = require('../../config/main');
//create jwt
var jwt = require('../../utils').jwt;

//models
var User = require('../../models/User');
var Brother =  require('../../models/Brother');
var Brothers =  require('../../models/Brothers');

//changing port for testing
config.port = 8080;
//turning logger off
config.loggerON = false;

var app = require('../../app');

var token; 
describe('testing brothers', function() {
	before(function() {
		var user = new User(new Brother('Jose','Prado', null, 2, '../../../../imgs/titus.jpg'), ["admin", "user:read", "user:write", "home:read", "admin:read", "admin:write"], 'jgpradoa@hotmail.com') //firstName, lastName, email, role, library
		token = jwt.create(user);
    });

	it('testing get all', function(done) {
    	request(app)
		  .get('/api/brothers/getAll')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		    assert.ok(response.body.data.length == 9, 'result length');
		    var brothers = Brothers();
		    assert.deepEqual(response.body.data, brothers, 'comparing array');
		    return done();
		});
    });   

    it('get all testing invalid Token', function(done) {
    	request(app)
		  .get('/api/brothers/getAll')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token + 'a')
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		    assert.ok(response.body.error === 'invalid token...', 'message');

		    return done();
		});
    }); 

    it('testing filterByBro', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Jose Prado')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		    assert.ok(response.body.data.length == 1, 'result length');
		    var brothers = [new Brother('Jose','Prado', {coordinates: {lat: 0, long: 4}, name: 'Lib 4'}, 2, '../../../../imgs/titus.jpg')];
		    assert.deepEqual(response.body.data, brothers, 'comparing array');
		    return done();
		});
    });   

    it('testing filterByBro non found', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Greatest Ever')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		   assert.ok(response.body.data.length == 0, 'result length');
		   return done();
		});
    });

    it('testing filterByBro wrong lastName', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Jose Ever')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		   assert.ok(response.body.data.length == 0, 'result length');
		   return done();
		});
    });

    it('testing filterByBro wrong firstName', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Greatest Prado')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		   assert.ok(response.body.data.length == 0, 'result length');
		   return done();
		});
    });

    it('testing filterByBro firstName only', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Jose')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		   assert.ok(response.body.data.length == 1, 'result length');
		   var brothers = [new Brother('Jose','Prado', {coordinates: {lat: 0, long: 4}, name: 'Lib 4'}, 2, '../../../../imgs/titus.jpg')];
		   assert.deepEqual(response.body.data, brothers, 'comparing array');
		   return done();
		});
    });

    it('testing filterByBro lastName only', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro?name=Chow')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(200)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    
		   assert.ok(response.body.data.length == 1, 'result length');
		   var brothers = [new Brother('Kevin','Chow', {coordinates: {lat: 0, long: 2}, name: 'Lib 2'}, 2, '../../../../imgs/absoluto.jpg')];
		   assert.deepEqual(response.body.data, brothers, 'comparing array');
		   return done();
		});
    });

    it('testing filterByBro invalid request', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token)
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    console.log(response.body.error);
		    assert.ok(response.body.error === 'wrong request', 'message');

		    return done();
		});
    });

    it('testing filterByBro invalid token', function(done) {
    	request(app)
		  .get('/api/brothers/filterByBro')
		  .set('Content-Type', 'application/json')
		  .set('Authorization', 'Bearer '+token+'a')
		  .expect(401)
		  .end(function(err, response){
		  	if(err)
		  		console.log(err);
		    console.log(response.body.error);
		    assert.ok(response.body.error === 'invalid token...', 'message');

		    return done();
		});
    });
});	

//TODO 