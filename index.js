const config = require('./config');
const express = require('express');
const pgp = require('pg-promise'); 

class Geocoder {
  
  constructor(cfg = { name: 'default', version: '1.0', db: {} }){
    
    this._server = express();

    /* Connection to the in-database application */
    const initOptions = {};
    this._db = pgp(initOptions)(cfg.db);  
    
    // Create the API routes
    require('./app/routes')(this._server, this._db);

    /* Start listening*/
    this._server.listen(cfg.port, 
      () => { console.log(`${cfg.name} is running on port ${cfg.port}`)} 
    );
  };
  
};

module.exports = new Geocoder(config);