var request = require('supertest');
var assert  = require('chai').assert;
const sinon = require('sinon');
var server  = require('../support/server');
var fh     = require("../support/fixture-helper.js");
var log     = require('metalogger')();

describe('users endpoint', function() {
  var app;

  beforeEach(function (done) {
    app = server.express();
    server.beforeEach(app, function() {
      done();
    });
  });

  afterEach(function () {
  });

  before(function() {

    const usersModel = require('users/models/users');
    this.getUsers = sinon.stub(usersModel.prototype, 'getUsers', function() {
      return new Promise(function(resolve, reject) {
        fh.loadFixture("users-list.json").then(function(sampleUsersList) {
          resolve(JSON.parse(sampleUsersList));
        }).catch(function(err) {
          log.error(err);
        });        
      });
    });

  });

  after(function() {
    this.getUsers.restore();
  });

  it('GET /users returns proper data', function(done) {
    request(app)
      .get('/users')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect(function(response) {
        var payload = response.body;
        assert.property(payload, 'users');
        assert.property(payload.users, 'data');
        assert.isArray(payload.users.data);
        assert.equal(payload.users.data.length, 2);
        assert.equal(payload.users.data[0].email, 'first@example.com');
      })
      .end(done);
            
  });

});
