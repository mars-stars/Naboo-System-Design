const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config();


const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
});


const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  slogan: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  default_price: DataTypes.INTEGER
}, {
  tableName: 'products',
  timestamps: false
});

const Feature = db.define('Feature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  feature: DataTypes.STRING,
  value: DataTypes.STRING
}, {
  tableName: 'features',
  timestamps: false
});

const Style = db.define('Style', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  sale_price: DataTypes.INTEGER,
  original_price: DataTypes.INTEGER,
  default_style: DataTypes.BOOLEAN
}, {
  tableName: 'styles',
  timestamps: false
});


const Photos = db.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: DataTypes.STRING,
  thumbnail_url: DataTypes.STRING
}, {
  tableName: 'photos',
  timestamps: false
});


const Sku = db.define('Sku', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  size: DataTypes.STRING,
  quantity: DataTypes.INTEGER
}, {
  tableName: 'skus',
  timestamps: false
});

const Related = db.define('Related', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  current_product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  related_product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
}, {
  tableName: 'related',
  timestamps: false
});

Product.hasMany(Feature, { foreignKey: 'product_id' });
Feature.belongsTo(Product);

Product.hasMany(Style, { foreignKey: 'product_id' });
Style.belongsTo(Product);

Style.hasMany(Photos, { foreignKey: 'style_id' });
Photos.belongsTo(Style);

Style.hasMany(Sku, { foreignKey: 'style_id' });
Sku.belongsTo(Style);

// Related.belongsToMany(Product, { as: 'current', foreignKey: 'current_product_id', through: Product });
// Related.belongsToMany(Product, { as: 'related', foreignKey: 'related_product_id', through: Product });

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Product.sync();
Related.sync();
module.exports = {
  db,
  Product,
  Related
};