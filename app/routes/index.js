const geocodeRoute = require('./geocode.route');

module.exports = function(app, db) {
  geocodeRoute(app, db);
};