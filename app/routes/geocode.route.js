module.exports = function(app, db){

  const { check, validationResult } = require('express-validator/check');
  const { sanitize } = require('express-validator/filter');
  const geocoderController = require('../controllers/geocoder.controller.js')
  
  app.get('/geocode',[
      
      check('address')
        .exists().withMessage('Missing parameter address')
        .isLength({min: 2}).withMessage('Value must be of at least 2 characters long.'),
      
      sanitize('address').customSanitizer((value, {req}) => {
        return req.query.address.replace(/[^\w\s]/gi, '');
      }),
      
      check('date')
        .exists().withMessage('Missing parameter date')
        .isInt({min: 1}).withMessage('Value must be a positive integer.'),
      
      check('precise',' Value must be 0 or 1')
        .optional({nullable: true})
        .isBoolean(),
      
      check('maxresults', 'Value must be between 1 and 100.')
        .optional({nullable: true})
        .isInt({min: 1, max: 100}),
    ],
   (req,res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      console.log(req.query)
      geocoderController.retrieve(req.query, db, (response) => { res.status(200).send(response) } );
  });

};