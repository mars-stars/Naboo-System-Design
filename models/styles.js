const { db, Product, Style, Photos, Sku } = require('../db/index.js');


module.exports = {
  // get product by id and include styles and photos
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
      let results = product.get().results;

      // loop over each style
      results.forEach(style => {
        let styleId = style.id;

        // loop over each sku
        var skuObj = {};
        style.skus.forEach(sku => {
          // extract the data from each item in sku array
          let id = sku.id;
          let size = sku.size;
          let quantity = sku.quantity;

          // shape the object using the data
          skuObj[id] = { size: size, quantity: quantity };
        })
        // attach the obj to the style
        style.setDataValue('skus', skuObj)
      })
      return product;
    })
    .then(product => {
      // pass to the controller
      cb(null, product);
    })
    .catch(err => {
      console.log('error in promise chain ', err);
      cb(err);
    })
  }
}