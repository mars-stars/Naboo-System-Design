const models = require('../models');

module.exports = {
  getAll: function (req, res) {
    models.styles.getAllStylesByProductId(req.params.id, (err, product) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      } else {
        res.status(200).json(product);
      }
    })
  },

};