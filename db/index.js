const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config();


const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: console.log,
  // logging: false
});


const Product = db.define('product', {
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

const Feature = db.define('feature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: DataTypes.INTEGER,
  feature: DataTypes.STRING,
  value: DataTypes.STRING
}, {
  tableName: 'features',
  timestamps: false
});

const Style = db.define('style', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  sale_price: DataTypes.INTEGER,
  original_price: DataTypes.INTEGER,
  'default?': DataTypes.BOOLEAN
}, {
  tableName: 'styles',
  timestamps: false
});


const Photos = db.define('photos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  styleId: DataTypes.INTEGER,
  url: DataTypes.TEXT,
  thumbnail_url: DataTypes.TEXT
}, {
  tableName: 'photos',
  timestamps: false
});


const Sku = db.define('sku', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  styleId: DataTypes.INTEGER,
  size: DataTypes.STRING,
  quantity: DataTypes.INTEGER
}, {
  tableName: 'skus',
  timestamps: false
});

const Related = db.define('related', {
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

Product.hasMany(Feature, { foreignKey: 'productId' });
Feature.belongsTo(Product);

Product.hasMany(Style, { foreignKey: 'productId',  as: 'results' });
Style.belongsTo(Product);

Style.hasMany(Photos, { foreignKey: 'styleId' });
Photos.belongsTo(Style);

Style.hasMany(Sku, { foreignKey: 'styleId' });
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
Feature.sync();
Style.sync();
Photos.sync();
Sku.sync();

module.exports = {
  db,
  Product,
  Related,
  Feature,
  Style,
  Photos,
  Sku
};