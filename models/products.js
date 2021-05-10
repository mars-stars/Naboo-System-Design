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
  getAll: function(query, cb) {
    let page = query.page || 1;
    let limit = query.limit || 5;
    Product.findAll({ limit: limit, offset: page })
    .then(products => {
      cb(null, products)
    })
    .catch(err => {
      cb(err);
    })
  }
}