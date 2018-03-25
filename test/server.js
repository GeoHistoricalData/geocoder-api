const request = require('supertest');
const geocoder = require('../index.js')

describe('GET /geocode', function() {
  it('respond to GET /geocode', function(done) {
    request(geocoder)
      .get('/geocode')
      .expect(200, done);
  });
});