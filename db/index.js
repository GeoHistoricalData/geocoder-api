'use strict';

const config = require('config');
const promise = require('bluebird');

const initOptions = {
    promiseLib: promise,
};

const dbConfig = config.get('GeocoderDB.dbConfig');

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

// Create the database instance:
const db = pgp(dbConfig);

const sqlConfig = {
  "dir": "./db/sql",
  "output": "./db/prepared-sql.js",
  "module": {
    "name": "load",
    "path": "./sql"
  }
};

pgp.utils.buildSqlModule(sqlConfig);

module.exports = db;
