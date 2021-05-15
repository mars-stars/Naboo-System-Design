const models = require('../models');
const nodeCache = require('node-cache');
const cache = new nodeCache({ maxKeys: 100 });

module.exports = {
  get: function(req, res) {

    models.products.getOneProduct(req.params.id, (err, product) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(product);
      }
    })
  },
  getAll: function(req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;

    let cacheKey = `/products?p=${page},l=${limit}`;

    if (cache.has(cacheKey)) {
      res.status(200).send(cache.get(cacheKey));
    }  else {
      models.products.getAll(req.query, (err, products) => {
        if (err) {
          res.sendStatus(400)
        } else {
          cache.set(cacheKey, products);
          res.status(200).json(products);
        }
      })
    }
  }
 };