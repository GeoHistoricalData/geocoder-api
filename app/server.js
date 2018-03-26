const restify = require('restify');
const pgp = require('pg-promise')({});

class GeocoderServer {
  
  constructor(cfg = { name: 'default', version: '1.0', db: {} }){
    
    this._server =  restify.createServer({
      name: cfg.name,
      version: cfg.version
    });

    this._server.use(restify.plugins.queryParser());

    this._server.pre((req, res, next) => {
      console.info(`${req.method} - ${req.url} - ${req.query}`);
      return next();
    });

    this._server.listen(cfg.port, () => {
      console.log('%s listening at %s', this._server.name, this._server.url);
    });

    this._database = pgp(cfg.db);

    this._createRoutes();
  };

  _createRoutes(){

    this._server.get('/geocode', (req, res, next) => {
      
      let sql=`SELECT rank::text,
                  $<query_addr>||';'||$<query_date> AS input_adresse_query,
                  historical_name::text,
                  normalised_name::text,
                  sfti2daterange(COALESCE(f.specific_fuzzy_date,hs.default_fuzzy_date)) AS fuzzy_date,
                  CASE WHEN ST_NumGeometries(geom2) =1 
                    THEN ST_AsText(ST_GeometryN(geom2,1)) 
                    ELSE ST_AsText(geom2) 
                  END AS geom,
                  historical_source::text,
                  numerical_origin_process::text,
                  historical_geocoding.round(aggregated_distance::float,6) AS aggregated_distance,
                  historical_geocoding.round(spatial_precision::float,2) AS spatial_precision,
                  historical_geocoding.round(confidence_in_result::float,3) AS confidence_in_result,
                  historical_geocoding.round(semantic_distance::float,3 ) AS semantic_distance,
                  historical_geocoding.round(temporal_distance::float,3) AS temporal_distance,
                  historical_geocoding.round(number_distance::float,3) AS number_distance,
                  historical_geocoding.round(scale_distance::float,3) AS scale_distance,
                  historical_geocoding.round(spatial_distance::float,3) AS spatial_distance  
            FROM historical_geocoding.geocode_name_foolproof(
                                                              query_adress:=$<query_addr>,
                                                              query_date:= sfti_makesfti($<query_date>::integer),
                                                              use_precise_localisation:= $<do_precise_geocoding>::integer::boolean ,
                                                              max_number_of_candidates:=$<max_candidates>::integer
                                                            ) As f
            LEFT OUTER JOIN geohistorical_object.historical_source AS hs 
            ON (hs.short_name = f.historical_source),
                ST_SnapToGrid(geom,0.01) AS geom2
            ;`;
      console.info(this._database);
      this._database.any(sql,
        {
            query_addr: req.query.address,
            query_date: req.query.date,
            do_precise_geocoding: req.query.precise,
            max_candidates: req.query.maxresults,
        })
        .then(data => {
            res.send(200,data);
        })
        .catch(error => {
            console.log('ERROR:', error); // print the error;
        });
      return next();
    });   

  };
};

// Classes aren't hoisted so we need to wrap them in a function.
module.exports = module.exports = {
  GeocoderServer: GeocoderServer
};