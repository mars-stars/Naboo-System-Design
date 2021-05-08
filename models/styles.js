const { db, Product, Style } = require('../db/index.js');

module.exports = {
  getAllStylesByProductId: function(id, cb) {
    Product.findOne({
      where: {
        id: id
      },
      include: { model: Style }
    })
    .then(product => {
      cb(null, product)
    })
    .catch(err => {
      cb(err);
    })
  }
}