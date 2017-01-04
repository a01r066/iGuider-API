import mongoose from 'mongoose';
import { Router } from 'express';
import Location from '../model/location';
import bodyParser from 'body-parser';
import Review from '../model/review'
import SubCategory from '../model/subcategory'

import { authenticate} from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router();

  // CRUD - Create Read Update Delete
  // '/v1/restaurant/add' - Create
  // api.post('/add', authenticate, (req, res) => {
  api.post('/add', (req, res) => {
    let newLocation = new Location();
    newLocation.location_name = req.body.location_name;
    newLocation.location_translated_name = req.body.location_translated_name;
    newLocation.addressline = req.body.addressline;
    newLocation.city_id = req.body.city_id;
    newLocation.telephone = req.body.telephone;
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

    newLocation.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: newLocation.location_name + ' saved successfully' });
    });
  });

  // 'v1/hotel' - Read
  // api.get('/', authenticate, (req, res) => {
  api.get('/', (req, res) => {
    Location.find({}, (err, locations) => {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // '/v1/hotel/:id' - Read 1
  api.get('/:id', (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if (err) {
        res.send(err);
      }
      res.json(location);
    });
  });

  // Find locations by name
  // '/v1/location/name/:$name'
  api.get('/name/:name', (req, res) => {
    // Location.find({"name": {$regex : ".*"+req.params.name+".*"}}, (err, locations) => {
    Location.find({"name": {$regex : ".*"+req.params.location_name+".*", $options: 'i'}}, (err, locations) => {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // Find locations by tags
  // '/v1/location/city/:cityid/tags/:$tags'
  api.get('/city/:city_id/tags/:tags', (req, res) => {
    // Location.find({"tags": {$regex : ".*"+req.params.tags+".*"}}, (err, locations) => {
    Location.find({"tags": {$regex : ".*"+req.params.tags+".*", $options: 'i'}}, (err, locations) => {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });


  // '/v1/hotel/:id' - PUT - update an existing record
  // api.put('/:id', authenticate, (req, res) => {
  api.put('/:id', (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if (err) {
        res.send(err);
      }
      newLocation.location_name = req.body.location_name;
      newLocation.location_translated_name = req.body.location_translated_name;
      newLocation.addressline = req.body.addressline;
      newLocation.city_id = req.body.city_id;
      newLocation.telephone = req.body.telephone;
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

      location.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: location.location_name + ' info updated' });
      });
    });
  });

  // '/v1/hotel/:id' - DELETE - remove a hotel
  api.delete('/:id', authenticate, (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if(err){
        res.status(500).send(err);
        return;
      }
      if(location == null){
        res.status(404).send("Location not found!");
        return;
      }
      Location.remove({
        _id: req.params.id
      }, (err, location) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        Review.remove({
          location: req.params.id
        }, (err, review) => {
          if(err){
            res.send(err);
          }
          res.json({message: "Location & Review Successfully Removed"});
      });
      });
    });
  });

  // add review for a specific location_id
  // '/api/v1/location/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.location_id = location._id

      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        location.reviews.push(newReview);
        location.save(err => {
          if(err){
            res.send(err);
          }
          res.json({message: 'Location review saved!'});
        });
      });
    });
  });

  // get reviews of location id
  // 'v1/location/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({location: req.params.id}, (err, reviews) => {
      if(err){
        res.send(err);
      }
      res.json(reviews)
    });
  });

  // get locations from specific subcategoryid
  // '/api/v1/location/subcategory/:subcategoryid'
  api.get('/subcategory/:subcategory_id', (req, res) => {
    Location.find({subcategory_id: req.params.subcategory_id}, (err, locations) => {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // get locations from specific subcategoryid of specify cityid
  // '/api/v1/location/subcategory/:subcategoryid/city/:cityid'
  api.get('/subcategory/:subcategory_id/city/:city_id', (req, res) => {
    Location.find({subcategory_id: req.params.subcategory_id, cityid: req.params.city_id}, (err, locations) => {
      if (err) {
        res.send(err);
      }
      res.json(locations);
    });
  });

  // get locations from specific city
  // '/api/v1/location/city/:cityid'
  api.get('/city/:city_id', (req, res) => {
    Location.find({ city_id: req.params.city_id }, (err, locations) => {
      if(err){
        res.send(err);
      }
      res.json(locations);
    });
  });

  //

  return api;
}
