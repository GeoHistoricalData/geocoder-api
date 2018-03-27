/* Node doesn't support ES6 modules. Too bad :( (26/03/2018)*/
const config = require('./config');
const hgserver = require('./app/server');

server = new hgserver.GeocoderServer(config);

server.start(
  () => {console.info('Server is starting...')},
  (err) => {console.info(`Statup failed : ${err}`)}
  );