'use strict';

var utils = require('../utils/writer.js');
var Geocoding = require('../service/GeocodingService');

module.exports.geocode = function geocode (req, res, next) {
  var body = req.swagger.params['body'].value;
  Geocoding.geocode(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
