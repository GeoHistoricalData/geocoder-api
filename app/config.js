module.exports = {
  name: 'HISTORICAL GEOCODER API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    host: '176.31.187.44',
    port: 5433,
    database: 'test',
    user: 'postgres',
    password: 'GHDB_postgres_admin',
  },
};
