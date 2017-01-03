'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // 'v1/category' - Read
  api.get('/', function (req, res) {
    _review2.default.find({}, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // '/v1/review/:id' - DELETE - remove a hotel
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _review2.default.remove({
      _id: req.params.id
    }, function (err, review) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Review Successfully Removed" });
    });
  });

  return api;
};
//# sourceMappingURL=reviews.js.map