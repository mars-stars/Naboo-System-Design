const models = require('../models');

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
    models.products.getAll(req.query, (err, products) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(products);
      }
    })
  }
 };