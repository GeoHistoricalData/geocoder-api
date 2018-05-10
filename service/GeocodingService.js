'use strict';

const db = require('../db');
const sql = require('../db/prepared-sql');

/**
 * Geocode a set of addresses
**/
exports.batchGeocoding = function(addrSet) {
  return db.tx('geocoding-transaction', t => {
    let queries = addrSet.map(q => t.any(sql.geocodeAddress,{
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

/**
* Geocode a single adress sent with GET
**/
exports.singleGeocoding = function(address,date,precision,maxresults) {
  return db.any(sql.geocodeAddress,
    {
       query_addr: address,
        query_date: date,
        do_precise_geocoding: precision,
        max_results: maxresults  
    }
  )
}

