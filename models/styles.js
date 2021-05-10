const { db, Product, Style, Photos, Sku } = require('../db/index.js');

module.exports = {
  getAllStylesByProductId: function (id, cb) {
    Product.findOne({
      where: {
        id: id
      },
      attributes: ['id'],
      include: [
        {
          model: Style,
          as: 'results',
          include: [
            {
              model: Photos,
              attributes: ['thumbnail_url', 'url']
            },
            {
              model: Sku
            }
          ]
        }
      ]
    })
    .then(product => {
      Sku.findAll({
        where: {
          styleId: id
        }
      })
      .then(Skus => {
        var skuObj = {};

        let skusObjArray = Skus.forEach(sku => {
          let id = sku.id;
          let size = sku.size;
          let quantity = sku.quantity;

          skuObj[id] = { size: size, quantity: quantity };
        })

        product.results.forEach(result => {
          result.skus = skuObj;
          // try a test property to see if we can even alter the data obj
          result.test = 'test'
        })
        // console.log('product skus', product);
      })
      .then(product => {
        // console.log('product skus', product);

        cb(null, product);
      })
    })
    .catch(err => {
      console.log('error in promise chain ', err);
      cb(err);
    })
  }
}