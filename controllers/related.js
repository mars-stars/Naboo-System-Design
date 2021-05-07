const models = require('../models');

module.exports = {
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