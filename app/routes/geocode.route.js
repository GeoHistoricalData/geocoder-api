module.exports = function(app, db){

  const geocoderController = require('../controllers/geocoder.controller.js')
  
  app.get('/geocode', (req,res) => {
      geocoderController.retrieve(req.query, db, (response) => { res.status(200).send(response) } );
  });

};