var request = require('supertest');

var server = require('../support/server');

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

  it('responds to /users with a 200 OK', function(done) {
    request(app)
      .get('/users')
      .expect(200, done);
  });

});
