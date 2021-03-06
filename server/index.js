
const controller = require('../controllers');
const router = require('express').Router();

router.get('/products', controller.products.getAll);

router.get('/products/:id', controller.products.get);

router.get('/products/:id/related', controller.related.getRelatedProducts);

router.get('/products/:id/styles', controller.styles.getAll);

module.exports= router;