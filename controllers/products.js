const models = require('../models');

module.exports = {
  get: function(req, res) {
    models.products.getOne(req.params.id, (err, product) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(product);
      }
    })
  },
  getAll: function(req, res) {
    models.products.getAll((err, products) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(products);
      }
    })
  }
 };