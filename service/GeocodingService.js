'use strict';

const db = require('../db');
const sql = require('../db/prepared-sql');

/**
 * Geocode an adress at a given date.
 * Some description.
 *
 * body List  (optional)
 * no response value expected for this operation
 **/
exports.geocode = function(body) {
  return db.tx('geocoding-transaction', t => {
    let queries = body.map(q => t.any(sql.geocodeAddress,{
            query_addr: q.address,
            query_date: q.date,
            do_precise_geocoding: q.precision,
            max_results: q.maxresults  
        }).catch(error => {
          console.error(`SQL ERR: ${error}`);
          return [];
        })
    );
    return t.batch(queries);
  });
}


