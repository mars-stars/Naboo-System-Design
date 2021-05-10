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
            }
          ]
        }
      ]
    })
    .then(product => {
      // find all skus that belong to the style
      Sku.findAll({
        where: {
          styleId: id
        }
      })
      .then(Skus => {
        var skuObj = {};
        // we have a skus array be we need an object of object { skuId: {size, quantity} }
        let skusObjArray = Skus.forEach(sku => {
          // extract the data from each item in sku array
          let id = sku.id;
          let size = sku.size;
          let quantity = sku.quantity;

          // shape the object using the data
          skuObj[id] = { size: size, quantity: quantity };
        })

        // the sku object should go inside each style (result)
        product.results.forEach(result => {
          // attached each new sku object to sequelize instance
          result.setDataValue('skus', skuObj)
        })

        return product; // pass to next promise
      })
      .then(product => {
         cb(null, product);
      })
    })
    .catch(err => {
      console.log('error in promise chain ', err);
      cb(err);
    })
  }
}