
const controller = require('../controllers');
const router = require('express').Router();

router.get('/products', controller.products.getAll);

router.get('/products/:id', controller.products.get);

router.get('/related', controller.related.getAll);

module.exports= router;