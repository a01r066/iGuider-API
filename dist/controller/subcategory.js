'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _subcategory = require('../model/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // CRUD - Create Read Update Delete
  // '/v1/subcategory/add' - Create
  api.post('/add', function (req, res) {
    var newSubCategory = new _subcategory2.default();
    newSubCategory.name = req.body.name;
    newSubCategory.description = req.body.description;
    newSubCategory.category_id = req.body.category_id;

    newSubCategory.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'SubCategory saved successfully' });
    });
  });

  // 'v1/category/subcategory' - Read
  api.get('/', function (req, res) {
    _subcategory2.default.find({}, function (err, subcategories) {
      if (err) {
        res.send(err);
      }
      res.json(subcategories);
    });
  });

  // '/v1/subcategory/:id' - Read 1
  api.get('/:id', function (req, res) {
    _subcategory2.default.findById(req.params.id, function (err, subcategory) {
      if (err) {
        res.send(err);
      }
      res.json(subcategory);
    });
  });

  // '/v1/subcategory/:id' - PUT - update an existing record
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.findById(req.params.id, function (err, subcategory) {
      if (err) {
        res.send(err);
      }
      subcategory.name = req.body.name;
      subcategory.description = req.body.description;
      subcategory.category_id = req.body.category_id;

      subcategory.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'SubCategory info updated' });
      });
    });
  });

  // '/v1/subcategory/:id' - DELETE - remove a hotel
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.remove({
      _id: req.params.id
    }, function (err, subcategory) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Subcategory Successfully Removed" });
    });
  });

  return api;
};
//# sourceMappingURL=subcategory.js.map