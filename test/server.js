const request = require('supertest');
const geocoder = require('../app/server.js')

describe('GET /geocode', function() {
  it('GET /geocode should respond and send JSON', function(done) {
    request(geocoder)
      .get('/geocode')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});