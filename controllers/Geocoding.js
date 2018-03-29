'use strict';

var utils = require('../utils/writer.js');
var Geocoding = require('../service/GeocodingService');

module.exports.geocode = function geocode (req, res, next) {
  var address = req.swagger.params['address'].value;
  var date = req.swagger.params['date'].value;
  var precise = req.swagger.params['precise'].value;
  var maxresults = req.swagger.params['maxresults'].value;
  Geocoding.geocode(address,date,precise,maxresults)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.info('ERROR');
      utils.writeJson(res, response);
    });
};
