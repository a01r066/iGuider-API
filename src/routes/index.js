import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import location from '../controller/location';
import category from '../controller/category';
import subcategory from '../controller/subcategory';
import account from '../controller/account';
import city from '../controller/city';
import country from '../controller/country';
import review from '../controller/review';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/location', location({ config, db }));
  router.use('/category', category({ config, db }));
  router.use('/subcategory', subcategory({ config, db }));
  router.use('/account', account({ config, db }));
  router.use('/city', city({ config, db }));
  router.use('/country', country({ config, db }));
  router.use('/review', review({ config, db }));
});

export default router;
