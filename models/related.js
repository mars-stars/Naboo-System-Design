const db = require('../db/index.js');

module.exports = {
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