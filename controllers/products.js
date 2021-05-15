const models = require('../models');
const nodeCache = require('node-cache');
const cache = new nodeCache({ maxKeys: 50000 });

module.exports = {
  get: function(req, res) {
    let id = req.params.id;
    let cacheKey = `/products/${id}`;

    if (cache.has(cacheKey)) {
      res.status(200).send(cache.get(cacheKey));
    } else {

      models.products.getOneProduct(req.params.id, (err, product) => {
        if (err) {
          res.sendStatus(400)
        } else {
          cache.set(cacheKey, JSON.stringify(product));
          res.status(200).send(product);
        }
      })
    }

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