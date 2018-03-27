const restify = require('restify');
const errors = require('restify-errors');
const ctrlGeocoder = require('./controllers/geocoder.controller.js');
const pgp = require('pg-promise'); 

class GeocoderServer {
  
  constructor(cfg = { name: 'default', version: '1.0', db: {} }){
    
    this._cfg = cfg;

    let srv = this._server = restify.createServer({
      name: cfg.name,
      version: cfg.version
    });

    srv.use(restify.plugins.queryParser());

    srv.pre((req, res, next) => {
      console.info(`${req.method} - ${req.url}`);
      return next();
    });

    
    /** Connect to the geocoder database */
    const initOptions = {};
    this._database = pgp(initOptions)(cfg.db);  
    
    /** Create the API routes*/
    this._createRoutes();
  };

  _createRoutes(){

    this._server.get('/geocode', (req, res, next) => {
      if (!req.query.date){
        return next(new errors.MissingParameterError('Parameter date is missing.'));
      };

      if (!req.query.address){
        return next(new errors.MissingParameterError('Parameter address is missing.'));
      };

      //TODO Avoid passing the db connection to controllers on every call.
      ctrlGeocoder.retrieve(req.query, this._database, (response) => { res.send(response.code, response.body) }); 
      return next();
    });

    this._server.post('/geocode', (req,res,next) => {
      return next( new  errors.BadRequestError());  
    });
  };

  start( next, err ){
    try{
      const srv = this._server;
      srv.listen(this._cfg.port, () => {
        console.log('%s listening at %s', srv.name, srv.url);
      });
    }catch(error){
      err(error);
    };
    return next();
  };

};

// Classes aren't hoisted so we need to wrap them in a function unless we return an instance.
module.exports = {
  GeocoderServer: GeocoderServer
};