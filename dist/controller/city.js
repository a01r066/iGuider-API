'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _city = require('../model/city');

var _city2 = _interopRequireDefault(_city);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // add city
  // '/v1/city/add'  - Create
  api.post('/add', function (req, res) {
    var newCity = new _city2.default();
    newCity.name = req.body.name;

    newCity.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: newCity.name + ' added successfully!' });
    });
  });

  // get all city
  // '/v1/city' - Read
  api.get('/', function (req, res) {
    _city2.default.find({}, function (err, cities) {
      if (err) {
        res.send(err);
      }
      res.json(cities);
    });
  });

  // get city from specific cityid
  // '/v1/city/:cityid' - Read
  api.get('/:id', function (req, res) {
    _city2.default.findById(req.params.id, function (err, city) {
      if (err) {
        res.send(err);
      }
      res.json(city);
    });
  });

  return api;
};
//# sourceMappingURL=city.js.map