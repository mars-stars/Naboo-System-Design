const models = require('../models');
const nodeCache = require('node-cache');
const cache = new nodeCache({ maxKeys: 50000 });

module.exports = {
  getAll: function (req, res) {
    let id = req.params.id;
    let cacheKey = `/products/${id}/styles`;

    if (cache.has(cacheKey)) {

      let value = cache.get(cacheKey);
      res.status(200).json(JSON.parse(value));

    } else {
      models.styles.getAllStylesByProductId(req.params.id, (err, product) => {
        if (err) {
          console.log(err)
          res.sendStatus(400)
        } else {
          cache.set(cacheKey, JSON.stringify(product));
          res.status(200).json(product);
        }
      })
    }
  },

};