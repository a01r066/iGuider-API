import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Category from '../model/category';

import { authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router();

  // CRUD - Create Read Update Delete
  // '/v1/category/add' - Create
  api.post('/add', (req, res) => {
    let newCategory = new Category();
    newCategory.name = req.body.name;
    newCategory.description = req.body.description;

    newCategory.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Category saved successfully' });
    });
  });

  // 'v1/category' - Read
  api.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
      if (err) {
        res.send(err);
      }
      res.json(categories);
    });
  });

  // '/v1/category/:id' - Read 1
  api.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json(category);
    });
  });

  // '/v1/hotel/:id' - PUT - update an existing record
  api.put('/:id', authenticate, (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
      }
      category.name = req.body.name;
      category.description = req.body.description;

      category.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Category info updated' });
      });
    });
  });

  // '/v1/category/:id' - DELETE - remove a hotel
  api.delete('/:id', authenticate, (req, res) => {
    Category.remove({
      _id: req.params.id
    }, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Category Successfully Removed"});
    });
  });

  return api;
}
