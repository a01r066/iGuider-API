'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _location = require('../controller/location');

var _location2 = _interopRequireDefault(_location);

var _category = require('../controller/category');

var _category2 = _interopRequireDefault(_category);

var _subcategory = require('../controller/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

var _city = require('../controller/city');

var _city2 = _interopRequireDefault(_city);

var _review = require('../controller/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

  // internal middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  // api routes v1 (/v1)
  router.use('/location', (0, _location2.default)({ config: _config2.default, db: db }));
  router.use('/category', (0, _category2.default)({ config: _config2.default, db: db }));
  router.use('/subcategory', (0, _subcategory2.default)({ config: _config2.default, db: db }));
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
  router.use('/city', (0, _city2.default)({ config: _config2.default, db: db }));
  router.use('/review', (0, _review2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map