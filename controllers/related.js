const models = require('../models');

module.exports = {
  getRelatedProducts: function(req, res) {
    models.related.getRelatedByProductId(req.params.id, (err, products) =>{
      if (err) {
        res.sendStatus(400)
      } else {
        res.status(200).json(products);
      }
    })
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