const models = require('../models');

module.exports = {
  getAll: function (req, res) {
    models.styles.getAllStylesByProductId(req.params.id, (err, product) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      } else {


        // // test appending properties here
        // product = json.stringify(product);
        res.status(200).json(product);
        // res.status(200).send(product);
        // try json.stringify product
        // .json(json.parse(product))

        // try send instead .json
      }
    })
  },

};