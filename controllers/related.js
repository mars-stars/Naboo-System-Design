const models = require('../models');
const nodeCache = require('node-cache');
const cache = new nodeCache({ maxKeys: 50000 });

module.exports = {
  getRelatedProducts: function(req, res) {
    let id = req.params.id;
    let cacheKey = `/products/${id}/related`;

    if (cache.has(cacheKey)) {
      res.status(200).send(cache.get(cacheKey));
    } else {
      models.related.getRelatedByProductId(req.params.id, (err, products) =>{
        if (err) {
          res.sendStatus(400)
        } else {
          cache.set(cacheKey, products);
          res.status(200).send(products);
        }
      })
    }
  },
  getAll: function(req, res) {
    models.related.getAll((err, products) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(products);
      }
    })
  }
 };