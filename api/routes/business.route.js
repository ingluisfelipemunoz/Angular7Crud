const express = require('express');
const app = express();
const businessRoutes = express.Router();

// Require Business model in our routes modules
let Business = require('../models/Business');

//Defined store route
businessRoutes.route('/add').post(function(req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});

    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get date(index or listing) router.addRoutes()
businessRoutes.route('/').get(function (req, res) {
  Business.find(function (err, business) {
    if(err) {
      console.log(err);
    } else {
      console.log('se estan mostrando los elementos');
      res.json(business);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business) {
    res.json(business);
  })
});


// Defined update route
businessRoutes.route('/update/:id').post(function (req, res, next) {
  console.log('updating in node');
  Business.findById(req.params.id, function (err, business) {
    if(!business){
      // return next(new Error('Could not load Document'));
      err = new Error('Could not load Document');
      err.status = 404;
      return next(err);
    } else {
      business.person_name = req.body.person_name;
      business.business_name = req.body.business_name;
      business.business_gst_number =  req.body.business_gst_number;

      business.save().then(business => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send('Unable to update the database');
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findByIdAndRemove({_id: req.params.id}, function(err, business) {
    if(err) {
      res.json(err);
    } else {
      res.json('Successfully removed');
    }
  });
});

module.exports = businessRoutes;
