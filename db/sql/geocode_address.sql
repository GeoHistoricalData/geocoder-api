SELECT rank::text,
          '$<query_addr:value>, $<query_date:value>' AS input_adresse_query,
          historical_name::text,
          normalised_name::text,
          sfti2daterange(COALESCE(f.specific_fuzzy_date,hs.default_fuzzy_date)) AS fuzzy_date,
          ST_AsGeoJSON(geom2)::json as geometry,
          ST_AsGeoJSON(geog)::json as geography,
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
    FROM historical_geocoding.geocode_name_latlong(
                                                      query_adress:=$<query_addr>,
                                                      query_date:= sfti_makesfti($<query_date>::integer),
                                                      use_precise_localisation:= $<do_precise_geocoding>::integer::boolean ,
                                                      max_number_of_candidates:=$<max_results>::integer
                                                    ) As f
    LEFT OUTER JOIN geohistorical_object.historical_source AS hs 
    ON (hs.short_name = f.historical_source),
        ST_SnapToGrid(geom,0.01) AS geom2
