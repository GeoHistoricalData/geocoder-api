const restify = require('restify');
const errors = require('restify-errors');
const ctrlGeocoder = require('./controllers/geocoder.controller.js');
const pgp = require('pg-promise')({});

class GeocoderServer {
  
  constructor(cfg = { name: 'default', version: '1.0', db: {} }){
    let srv = this._server;
    
    srv =  restify.createServer({
      name: cfg.name,
      version: cfg.version
    });

    srv.use(restify.plugins.queryParser());

    srv.pre((req, res, next) => {
      console.info(`${req.method} - ${req.url}`);
      return next();
    });

    srv.listen(cfg.port, () => {
      console.log('%s listening at %s', srv.name, srv.url);
    });

    this._database = pgp(cfg.db);

    this._createRoutes();
  };

  _createRoutes(){

    this._server.get('/geocode', (req, res, next) => {
      //TODO Avoid passing the db connection to controllers on every call.
      ctrlGeocoder.retrieve(req.query, this._database, (response) => { res.send(response.code, response.body) }); 
      return next();
    });

    this._server.post('/geocode', (req,res,next) => {
      return next( new  errors.BadRequestError());  
    });
  };
};

// Classes aren't hoisted so we need to wrap them in a function unless we return an instance.
module.exports = {
  GeocoderServer: GeocoderServer
};