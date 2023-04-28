const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const categories = require('./categoriesModel');

const products = sequelize.define('products', {
  product_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  user_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'user_ID'
    }
  },
  categories_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'categories_ID'
    }
  }
}, {
  timestamps: false
});
products.belongsTo(categories, { foreignKey: 'categories_ID' })
categories.hasMany(products, { foreignKey: 'categories_ID' });


module.exports = products;

