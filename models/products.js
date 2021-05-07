const { db, Product, Feature } = require('../db/index.js');

module.exports = {
  getOneProduct: function(id, cb) {
    Product.findOne({
      where: {
        id: id
      },
      include: { model: Feature, attributes: ['feature', 'value']}
    })
    .then(product => {
      cb(null, product)
    })
    .catch(err => {
      cb(err);
    })
  },
  getAll: function(cb) {
    Product.findAll()
    .then(products => {
      cb(null, products)
    })
    .catch(err => {
      cb(err);
    })
  }
}