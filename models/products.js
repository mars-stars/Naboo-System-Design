const db = require('../db/index.js');

module.exports = {
  getOne: function(id, cb) {
    db.Product.findAll({
      where: {
        id: id
      }
    })
    .then(product => {
      cb(null, product)
    })
    .catch(err => {
      cb(err);
    })
  },
  getAll: function(cb) {
    db.Product.findAll()
    .then(products => {
      cb(null, products)
    })
    .catch(err => {
      cb(err);
    })
  }
}