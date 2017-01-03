import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import City from '../model/city';

import { authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router();

  // add city
  // '/v1/city/add'  - Create
  api.post('/add', (req, res) => {
    let newCity = new City();
    newCity.name = req.body.name;
    
    newCity.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({ message: newCity.name + ' added successfully!'})
    });
  });

  // get all city
  // '/v1/city' - Read
  api.get('/', (req, res) => {
    City.find({}, (err, cities) => {
      if(err){
        res.send(err);
      }
      res.json(cities);
    });
  });

  // get city from specific cityid
  // '/v1/city/:cityid' - Read
  api.get('/:id', (req, res) => {
    City.findById(req.params.id, (err, city) => {
      if (err) {
        res.send(err);
      }
      res.json(city);
    });
  });

  return api;
}
