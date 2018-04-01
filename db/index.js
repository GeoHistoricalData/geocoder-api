'use strict';

const promise = require('bluebird');

const initOptions = {
    promiseLib: promise,
};

const config = {
    host: '176.31.187.44',
    port: 5433,
    database: 'test',
    user: 'postgres',
    password: 'GHDB_postgres_admin',
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);


// Create the database instance:
const db = pgp(config);


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
