import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Country from '../model/country';

import { authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router();

  // add country
  // '/v1/country/add'  - Create
  api.post('/add', (req, res) => {
    let newCountry = new Country();
    newCountry.country_id = req.body.country_id;
    newCountry.country_name = req.body.country_name;
    newCountry.countryisocode = req.body.countryisocode;

    newCountry.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({ message: newCountry.country_name + ' added successfully!'})
    });
  });

  // get all country
  // '/v1/country' - Read
  api.get('/', (req, res) => {
    Country.find({}, (err, countries) => {
      if(err){
        res.send(err);
      }
      res.json(countries);
    });
  });

  // get country from specific country_id
  // '/v1/country/:country_id' - Read
  api.get('/:country_id', (req, res) => {
    Country.findById(req.params.country_id, (err, country) => {
      if (err) {
        res.send(err);
      }
      res.json(country);
    });
  });

  return api;
}
