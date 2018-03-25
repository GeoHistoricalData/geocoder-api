
/**
* Module Dependencies
*/
const config = require('./config');
const restify = require('restify');
const pgp = require('pg-promise');


/**
* Initialize Server
*/
const server = restify.createServer({
  name: config.name,
  version: config.version,
});


/**
* Load plugins
*/
server.use(restify.plugins.queryParser());


/**
*  Middleware
*/
server.pre((req, res, next) => {
  console.info(`${req.method} - ${req.url} - ${req.query}`);
  return next();
});

/**
*  Requests handling
*/
server.get('/geocode', (req, res, next) => {
  res.send(200);
  return next();
});   



server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;