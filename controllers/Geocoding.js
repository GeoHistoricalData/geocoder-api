'use strict';

var utils = require('../utils/writer.js');
var Geocoding = require('../service/GeocodingService');

module.exports.geocodeGET = function geocodeGET (req, res, next) {
  var address = req.swagger.params['address'].value;
  var date = req.swagger.params['date'].value;
  var precision = req.swagger.params['precision'].value;
  var maxresults = req.swagger.params['maxresults'].value;
  Geocoding.singleGeocoding(address,date,precision,maxresults)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.geocodePOST = function (req, res, next) {
  var body = req.swagger.params['body'].value;
  Geocoding.batchGeocoding(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
