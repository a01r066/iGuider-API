'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _location = require('../model/location');

var _location2 = _interopRequireDefault(_location);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _subcategory = require('../model/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // CRUD - Create Read Update Delete
  // '/v1/restaurant/add' - Create
  // api.post('/add', authenticate, (req, res) => {
  api.post('/add', function (req, res) {
    var newLocation = new _location2.default();
    newLocation.location_name = req.body.name;
    newLocation.location_translated_name = req.body.location_translated_name;
    newLocation.addressline = req.body.addressline;
    newLocation.city_id = req.body.city_id;
    newLocation.country_id = req.body.country_id;
    newLocation.countryisocode = req.body.countryisocode;
    newLocation.star_rating = req.body.star_rating;
    newLocation.geometry.coordinate.longitude = req.body.geometry.coordinate.longitude;
    newLocation.geometry.coordinate.latitude = req.body.geometry.coordinate.latitude;
    newLocation.url = req.body.url;
    newLocation.checkin = req.body.checkin;
    newLocation.checkout = req.body.checkout;
    newLocation.numberrooms = req.body.numberrooms;
    newLocation.numberfloors = req.body.numberfloors;
    newLocation.photos = req.body.photos;
    newLocation.overview = req.body.overview;
    newLocation.rates_from = req.body.rates_from;
    newLocation.number_of_reviews = req.body.number_of_reviews;
    newLocation.rating_average = req.body.rating_average;
    newLocation.telephone = req.body.telephone;
    newLocation.subcategory_id = req.body.subcategory_id;
    newLocation.tags = req.body.tags;

    newLocation.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: newLocation.name + ' saved successfully' });
    });
  });

  // 'v1/hotel' - Read
  // api.get('/', authenticate, (req, res) => {
  api.get('/', function (req, res) {
    _location2.default.find({}, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // '/v1/hotel/:id' - Read 1
  api.get('/:id', function (req, res) {
    _location2.default.findById(req.params.id, function (err, location) {
      if (err) {
        res.send(err);
      }
      res.json(location);
    });
  });

  // Find locations by name
  // '/v1/location/name/:$name'
  api.get('/name/:name', function (req, res) {
    // Location.find({"name": {$regex : ".*"+req.params.name+".*"}}, (err, locations) => {
    _location2.default.find({ "name": { $regex: ".*" + req.params.name + ".*", $options: 'i' } }, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // Find locations by tags
  // '/v1/location/city/:cityid/tags/:$tags'
  api.get('/city/:city_id/tags/:tags', function (req, res) {
    // Location.find({"tags": {$regex : ".*"+req.params.tags+".*"}}, (err, locations) => {
    _location2.default.find({ "tags": { $regex: ".*" + req.params.tags + ".*", $options: 'i' } }, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // '/v1/hotel/:id' - PUT - update an existing record
  // api.put('/:id', authenticate, (req, res) => {
  api.put('/:id', function (req, res) {
    _location2.default.findById(req.params.id, function (err, location) {
      if (err) {
        res.send(err);
      }
      newLocation.location_name = req.body.name;
      newLocation.location_translated_name = req.body.location_translated_name;
      newLocation.addressline = req.body.addressline;
      newLocation.city_id = req.body.city_id;
      newLocation.country_id = req.body.country_id;
      newLocation.countryisocode = req.body.countryisocode;
      newLocation.star_rating = req.body.star_rating;
      newLocation.geometry.coordinate.longitude = req.body.geometry.coordinate.longitude;
      newLocation.geometry.coordinate.latitude = req.body.geometry.coordinate.latitude;
      newLocation.url = req.body.url;
      newLocation.checkin = req.body.checkin;
      newLocation.checkout = req.body.checkout;
      newLocation.numberrooms = req.body.numberrooms;
      newLocation.numberfloors = req.body.numberfloors;
      newLocation.photos = req.body.photos;
      newLocation.overview = req.body.overview;
      newLocation.rates_from = req.body.rates_from;
      newLocation.number_of_reviews = req.body.number_of_reviews;
      newLocation.rating_average = req.body.rating_average;
      newLocation.telephone = req.body.telephone;
      newLocation.subcategory_id = req.body.subcategory_id;
      newLocation.tags = req.body.tags;

      location.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: location.name + ' info updated' });
      });
    });
  });

  // '/v1/hotel/:id' - DELETE - remove a hotel
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _location2.default.findById(req.params.id, function (err, location) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (location == null) {
        res.status(404).send("Location not found!");
        return;
      }
      _location2.default.remove({
        _id: req.params.id
      }, function (err, location) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        _review2.default.remove({
          location: req.params.id
        }, function (err, review) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Location & Review Successfully Removed" });
        });
      });
    });
  });

  // add review for a specific location_id
  // '/api/v1/location/reviews/add/:id'
  api.post('/reviews/add/:id', function (req, res) {
    _location2.default.findById(req.params.id, function (err, location) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.location_id = location._id;

      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        location.reviews.push(newReview);
        location.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Location review saved!' });
        });
      });
    });
  });

  // get reviews of location id
  // 'v1/location/reviews/:id'
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ location: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // get locations from specific subcategoryid
  // '/api/v1/location/subcategory/:subcategoryid'
  api.get('/subcategory/:subcategoryid', function (req, res) {
    _location2.default.find({ subcategoryid: req.params.subcategoryid }, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // get locations from specific subcategoryid of specify cityid
  // '/api/v1/location/subcategory/:subcategoryid/city/:cityid'
  api.get('/subcategory/:subcategory_id/city/:city_id', function (req, res) {
    _location2.default.find({ subcategory_id: req.params.subcategory_id, cityid: req.params.city_id }, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // get locations from specific city
  // '/api/v1/location/city/:cityid'
  api.get('/city/:city_id', function (req, res) {
    _location2.default.find({ cityid: req.params.city_id }, function (err, locations) {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  //

  return api;
};
//# sourceMappingURL=location.js.map