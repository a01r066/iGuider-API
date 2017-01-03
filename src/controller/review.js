import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Review from '../model/review';

import { authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router();

  // 'v1/review' - Read
  api.get('/', (req, res) => {
    Review.find({}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // GET reviews of specific location id
  // 'v1/review/:locationid'
  api.get('/:location_id', (req, res) => {
    Review.find({locationid: req.params.location_id}, (err, reviews) => {
      if(err){
        res.send(err);
      }
      res.json(reviews);
    });
  });


  // '/v1/review/:id' - DELETE - remove a hotel
  api.delete('/:id', authenticate, (req, res) => {
    Review.remove({
      _id: req.params.id
    }, (err, review) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Review Successfully Removed"});
    });
  });

  return api;
}
