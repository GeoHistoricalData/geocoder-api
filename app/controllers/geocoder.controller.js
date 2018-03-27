class GeocoderController {

  constructor(){};

  create(){};

  retrieve(params = {adress: 'paris', date: '2018', precise: '1', maxresults: '1' }, model = {}, callback = () => {}){
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
                                                        max_number_of_candidates:=$<max_results>::integer
                                                      ) As f
      LEFT OUTER JOIN geohistorical_object.historical_source AS hs 
      ON (hs.short_name = f.historical_source),
          ST_SnapToGrid(geom,0.01) AS geom2
      ;`;
    model.any(sql,
    {
        query_addr: params.address,
        query_date: params.date,
        do_precise_geocoding: params.precise,
        max_results: params.maxresults,
    })
    .then(data => {
      callback({ code: 200, body: data });
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
  };

  update(){};

  delete(){};
};


module.exports = new GeocoderController;