const db = require('../db/index.js');

module.exports = {
  getRelatedByProductId: function(id, cb) {
    db.Related.findAll({
      attributes: ['related_product_id'],
      where: {
        current_product_id: id
      },
      raw : true
    })
    .then(products => {
      products = products.map(product => product.related_product_id);
      cb(null, products)
    })
    .catch(err => {
      cb(err);
    })
  },
  getAll: function(cb) {
    db.Related.findAll()
    .then(products => {
      cb(null, products)
    })
    .catch(err => {
      cb(err);
    })
  }
}