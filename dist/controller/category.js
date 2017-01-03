'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _category = require('../model/category');

var _category2 = _interopRequireDefault(_category);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // CRUD - Create Read Update Delete
  // '/v1/category/add' - Create
  api.post('/add', function (req, res) {
    var newCategory = new _category2.default();
    newCategory.name = req.body.name;
    newCategory.description = req.body.description;

    newCategory.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Category saved successfully' });
    });
  });

  // 'v1/category' - Read
  api.get('/', function (req, res) {
    _category2.default.find({}, function (err, categories) {
      if (err) {
        res.send(err);
      }
      res.json(categories);
    });
  });

  // '/v1/category/:id' - Read 1
  api.get('/:id', function (req, res) {
    _category2.default.findById(req.params.id, function (err, category) {
      if (err) {
        res.send(err);
      }
      res.json(category);
    });
  });

  // '/v1/hotel/:id' - PUT - update an existing record
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _category2.default.findById(req.params.id, function (err, category) {
      if (err) {
        res.send(err);
      }
      category.name = req.body.name;
      category.description = req.body.description;

      category.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Category info updated' });
      });
    });
  });

  // '/v1/category/:id' - DELETE - remove a hotel
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _category2.default.remove({
      _id: req.params.id
    }, function (err, category) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Category Successfully Removed" });
    });
  });

  return api;
};
//# sourceMappingURL=category.js.map