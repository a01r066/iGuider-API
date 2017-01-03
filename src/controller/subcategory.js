import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import SubCategory from '../model/subcategory';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // CRUD - Create Read Update Delete
  // '/v1/subcategory/add' - Create
  api.post('/add', (req, res) => {
    let newSubCategory = new SubCategory();
    newSubCategory.name = req.body.name;
    newSubCategory.description = req.body.description;
    newSubCategory.category_id = req.body.category_id;

    newSubCategory.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'SubCategory saved successfully' });
    });
  });

  // 'v1/category/subcategory' - Read
  api.get('/', (req, res) => {
    SubCategory.find({}, (err, subcategories) => {
      if (err) {
        res.send(err);
      }
      res.json(subcategories);
    });
  });

  // '/v1/subcategory/:id' - Read 1
  api.get('/:id', (req, res) => {
    SubCategory.findById(req.params.id, (err, subcategory) => {
      if (err) {
        res.send(err);
      }
      res.json(subcategory);
    });
  });

  // '/v1/subcategory/:id' - PUT - update an existing record
  api.put('/:id', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subcategory) => {
      if (err) {
        res.send(err);
      }
      subcategory.name = req.body.name;
      subcategory.description = req.body.description;
      subcategory.category_id = req.body.category_id;

      subcategory.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'SubCategory info updated' });
      });
    });
  });

  // '/v1/subcategory/:id' - DELETE - remove a hotel
  api.delete('/:id', authenticate, (req, res) => {
    SubCategory.remove({
      _id: req.params.id
    }, (err, subcategory) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Subcategory Successfully Removed"});
    });
  });

  return api;
}
